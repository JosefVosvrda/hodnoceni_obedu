const express = require("express");

const app = express();
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({extended: false}));

const reviewGW = require("./gateways/reviewGateway.js");
const dishGW = require("./gateways/dishGateway");
const clientGW = require("./gateways/clientGateway");
const {query} = require("./dbconn");

const jwt = require("jsonwebtoken");



let lunchArr = []



app.post("/login", async (req, res) =>
{

    const { username, password } = req.query;

    let headers = new Headers();
    headers.append("Host","strav.nasejidelna.cz")
    headers.append("User-Agent","curl/8.9.1");


    let crsfres = await  fetch("https://strav.nasejidelna.cz/0341/login", { method: "GET", headers: headers })

    let txt = await crsfres.text();
    let h = await crsfres.headers;
    let cookie = h.get("Set-Cookie");
    let token = cookie.split(";")[0].split("=")[1];


    let load =  new URLSearchParams({
        'j_username': username,
        'j_password': password,
        'terminal': 'false',
        '_csrf':token,
        "targetUrl": "/faces/secured/main.jsp"
    }).toString();
    let resauth = await fetch('https://strav.nasejidelna.cz/0341/j_spring_security_check',
        {
        method: 'POST',
        headers:{
            'Host': 'strav.nasejidelna.cz',
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0",
            "Content-Type": "application/x-www-form-urlencoded",
            "Origin": "https://strav.nasejidelna.cz",
            "Referer": "https://strav.nasejidelna.cz/0341/login",
            "Cookie": cookie,
        },
        body:load,
        redirect: "manual"
    });

    let header = await resauth.headers;
    let authorized =   !header.get("Location").includes("login_error");


    if(!authorized) res.status(401).json({msg:"Incorrect credentials"});

    let existingUser = await clientGW.getUser(username);
    if(!existingUser)
    {
        let id = await clientGW.createUser(username);
    }


    let jwtSecretKey = "cau";
    let data = {
        user
    }
    const usertoken = jwt.sign(data, jwtSecretKey);

    res.status(200).json({token: token});

    return res.status(200).json( authorized);

})



app.post("/register-daily-menu", async (req,res) =>
{
    const {dish_id, user_id, portion_size, temperature, visual, taste, smell, extra_payment} = req.body;
    try
    {
        let amount = await reviewGW.getUserReviewCountForToday(user_id);
        if(amount > 3) return res.status(400).json({msg:"Can't insert more than 3 reviews for the day"})

        await reviewGW.createReview(dish_id, user_id, portion_size, temperature, visual, taste, smell, extra_payment);
        res.status(200).json({msg: "OK"});

    }catch (er)
    {
        res.status(500).json(er);
    }
})



app.get("/daily-menu", async  (req, res) =>
{
    try
    {
        let result = await dishGW.getAllForDishType(req.params.id);
        res.status(200).json(result);
    }catch (er)
    {
        res.status(500).json(er);
    }

})

app.get("/all-for-type/:id", async  (req, res) =>
{
    try
    {
        let result = await dishGW.getAllForDishType(req.params.id);
        res.status(200).json(result);
    }catch (er)
    {
        res.status(500).json(er);
    }

})


app.get("/all-types", async  (req, res) =>
{
    try
    {
        let result = await dishGW.getAllTypes();

        res.status(200).json(result);
    }catch (er)
    {
        res.status(500).json(er);
    }

})


app.get("/all-dishes", async  (req, res) =>
{
    try
    {
        let result = await dishGW.getAllDishes();
        res.status(200).json(result);
    }catch (er)
    {
        res.status(500).json(er);
    }
})


app.post("/create-review", async  (req, res) =>
{
    const {dish_id, user_id, portion_size, temperature, visual, taste, smell, extra_payment} = req.body;
    try
    {
        let amount = await reviewGW.getUserReviewCountForToday(user_id);
        if(amount > 3) return res.status(400).json({msg:"Can't insert more than 3 reviews for the day"})

        await reviewGW.createReview(dish_id, user_id, portion_size, temperature, visual, taste, smell, extra_payment);
        res.status(200).json({msg: "OK"});

    }catch (er)
    {
        res.status(500).json(er);
    }
})


app.get("/get-all-reviews", async  (req, res) =>
{
    const {user_id} = req.body;
    try
    {
        let res = await reviewGW.getAllReviewsForUser(user_id);

        res.status(200).json({msg: "OK"});

    }catch (er)
    {
        res.status(500).json(er);
    }
})


app.listen(8080);





