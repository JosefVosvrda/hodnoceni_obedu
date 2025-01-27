const express = require("express");

const app = express();
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({extended: false}));

const reviewGW = require("./gateways/reviewGateway.js");
const dishGW = require("./gateways/dishGateway");


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





