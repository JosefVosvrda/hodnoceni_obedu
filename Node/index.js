const express = require("express");

const app = express();

const fs = require("fs");
const cors = require("cors");
let cookies = require("cookie-parser");
app.use(cors())
app.use(cookies());


//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({extended: false}));

const reviewGW = require("./gateways/reviewGateway.js");
const lunchGW = require("./gateways/lunchGateway");
const clientGW = require("./gateways/clientGateway");

const privateKey = fs.readFileSync('/home/jouda/private.key', 'utf8');

const {query} = require("./dbconn");

const jwt = require("jsonwebtoken");

//const secretKey = "skrumaz";

let lunchArr = []


app.post("/login", async (req, res) => {

    const {username, password} = req.body;

    let headers = new Headers();
    headers.append("Host", "strav.nasejidelna.cz")
    headers.append("User-Agent", "curl/8.9.1");


    let crsfres = await fetch("https://strav.nasejidelna.cz/0341/login", {method: "GET", headers: headers})

    let txt = await crsfres.text();
    let h = await crsfres.headers;
    let cookie = h.get("Set-Cookie");
    let token = cookie.split(";")[0].split("=")[1];


    let load = new URLSearchParams({
        'j_username': username,
        'j_password': password,
        'terminal': 'false',
        '_csrf': token,
        "targetUrl": "/faces/secured/main.jsp"
    }).toString();
    let resauth = await fetch('https://strav.nasejidelna.cz/0341/j_spring_security_check',
        {
            method: 'POST',
            headers: {
                'Host': 'strav.nasejidelna.cz',
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0",
                "Content-Type": "application/x-www-form-urlencoded",
                "Origin": "https://strav.nasejidelna.cz",
                "Referer": "https://strav.nasejidelna.cz/0341/login",
                "Cookie": cookie,
            },
            body: load,
            redirect: "manual"
        });

    let header = await resauth.headers;
    let authorized = !header.get("Location").includes("login_error");


    if (!authorized) return res.status(401).json({msg: "Incorrect credentials"});


    let id;
    let newsletter = false;
    let existingUser = await clientGW.getUserByName(username);
    if (!existingUser) {
        id = await clientGW.createUser(username);
    } else {
        id = existingUser.id;
        newsletter = Boolean(Buffer.from(existingUser.newsletter).readInt8());
    }


    let data = {
        user_id: id
    }

    const usertoken = jwt.sign(data, privateKey);
    return res.status(200).cookie("token", usertoken).json({newsletter: newsletter});

})


app.post("/register-daily-menu", async (req, res) => {
    const {lunches} = req.body;
    try {

        let desc1 = lunches[0].description;
        let desc2 = lunches[1].description;
        await lunchGW.registerDailyLunches(desc1, desc2);
        res.status(200).json({msg: "OK"});

    } catch (er) {
        res.status(500).json(er);
    }
})


const apipassword = "skrumaz"
// app.post("/newsletter/send", async (req, res) => {
//     const {lunches, email, subject, text} = req.body;
//
//     req.body.password = apipassword;
//
//     res.status(302).redirect("http://s-DD-C4a-24.dev.spsejecna.net:21168/firm/sendmail")
//
// })


app.get("/daily-menu", async (req, res) => {
    try {
        let result = await lunchGW.getAllForDishType(req.params.id);
        res.status(200).json(result);
    } catch (er) {
        res.status(500).json(er);
    }

})

app.get("/summary/:id", async (req, res) => {
    try {
        //let result = await lunchGW.(req.params.id);
        res.status(200).json(result);
    } catch (er) {
        res.status(500).json(er);
    }

})


app.get("/summary", async (req, res) => {
    try {
        let result = await lunchGW.getAllForDishType(req.params.id);
        res.status(200).json(result);
    } catch (er) {
        res.status(500).json(er);
    }

})


app.get("/review/user/", authenticateToken, async (req, res) => {
    try {
        let id = req.body.user_id;


        let result = await reviewGW.getAllReviewsForUser(id);

        res.status(200).json(result);
    } catch (er) {
        res.status(500).json(er);
    }

})

app.get("/review/:dish_id", authenticateToken, async (req, res) => {
    try {
        let id = req.params.dish_id;
        let result = await reviewGW.getAllReviewsForLunch(id);

        res.status(200).json(result);
    } catch (er) {
        res.status(500).json(er);
    }

})


app.get("/lunches", async (req, res) => {
    try {
        let result = await lunchGW.getPastWeekLunches();
        res.status(200).json(result);
    } catch (er) {
        res.status(500).json(er.message);
    }
})


app.post("/review", authenticateToken, async (req, res) => {
    const {
        lunch_id,
        user_id,
        soup_quality,
        soup_comment,
        main_taste,
        main_temperature,
        main_look,
        main_portion,
        main_comment,
        dessert_quality,
        dessert_comment
    } = req.body;
    try {

        let todayDate = new Date().toJSON().slice(0, 10);


        let amount = await reviewGW.getUserReviewCountForToday(user_id, todayDate);
        if (amount != 0) return res.status(400).json({msg: "Can't insert more than 1 review for the day"})

        let overall_score = ((+soup_quality + +main_taste + +main_temperature + +main_look + +main_portion + +dessert_quality)) / 6;

        await reviewGW.createReview(lunch_id, user_id, soup_quality, soup_comment, main_taste, main_temperature, main_look, main_portion, main_comment, dessert_quality, dessert_comment, overall_score, todayDate);


        res.status(200).json({msg: "OK"});

    } catch (er) {
        res.status(500).json(er);
    }
})


app.post("/newsletter", authenticateToken, async (req, res) => {
    let {newsletter, user_id} = req.body;
    try {
        newsletter =""+newsletter;
        await clientGW.updateUserNewsletter(newsletter, user_id);
        res.status(200).json({msg: "OK"});
    } catch (er) {
        res.status(500).json(er);
    }
});

app.get("/newsletter", authenticateToken, async (req, res) => {
    const { user_id} = req.body;
    try {

        let news = await clientGW.getUserNewsletter(user_id);

        news.newsletter = Boolean(Buffer.from(news.newsletter).readInt8());
        return res.status(200).json(news);
    } catch (er) {
        res.status(500).json(er);
    }
});


function authenticateToken(req, res, next) {

    const {token} = req.cookies

    jwt.verify(token, privateKey, (err, user) => {
        if (err) return res.status(400).json({msg: err, cookie: req.cookies});

        req.body.user_id = user.user_id;
        next();
    })
}


app.listen(8080);





