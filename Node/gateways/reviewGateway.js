const conn = require("../dbconn.js");

class DishGateway {
    static getAllReviewsForUser(user_id) {
        return new Promise((resolve, reject) => {
            conn.query("Select Dish.id as dish_id, Dish.name as dish_name, DishType.id as dish_type_id," +
                " DishType.name as dish_type_name, Review.id as review_id," +
                "Review.temperature as temperature, Review.portion_size, Review.visual, Review.taste, Review.taste Review.extra_payment, Review.review_date " +
                "from Review inner join Dish on review.dish_id = Dish.id inner join DishType.id on Dish.dish_type_id = DishType.id" +
                " where Review.user_id = ?", [user_id], (err, res) => {
                resolve(res);
            })
        });
    }


    static createReview(dish_id, user_id, portion_size, temperature, visual, taste, smell, extra_payment) {
        return new Promise((resolve, reject) => {
            conn.query("Insert into Review(dish_id, user_id, portion_size, temperature, visual, taste, smell, extra_payment, review_date) values(?,?,?,?,?,?,?,?,curdate())", [dish_id, user_id, portion_size, temperature, visual, taste, smell, extra_payment], (err, res) => {
                resolve(res)
            })
        })
    }


    static getUserReviewCountForToday(user_id) {
        return new Promise((resolve, reject) => {
            conn.query("Select Count(*) from Review where having user_id = ?", [user_id], (err, res) => {
                resolve(res);
            })
        });
    }


}

module.exports = DishGateway;