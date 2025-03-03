const conn = require("../dbconn.js");

class ReviewGateway {
    static getAllReviewsForUser(user_id) {
        return new Promise((resolve, reject) => {
            conn.query("select Review.*, Lunch.*  from Review inner join Lunch on Review.lunch_id = Lunch.id where Review.user_id = ?" , [user_id], (err, res) => {
                if(err) reject(err)
                resolve(res);
            })
        });
    }

    static getAllReviewsForLunch(lunch_id) {
        return new Promise((resolve, reject) => {
            conn.query("select Review.*, Lunch.*  from Review inner join Lunch on Review.lunch_id = Lunch.id where Review.lunch_id = ?" , [lunch_id], (err, res) => {
                if(err) reject(err)
                resolve(res);
            })
        });
    }




    static createReview(lunch_id, user_id, soup_quality, soup_comment, main_taste, main_temperature,main_look, main_portion, main_comment, dessert_quality, dessert_comment, overall_score, review_date) {
        return new Promise((resolve, reject) => {
            conn.query("Insert into Review(lunch_id, user_id, soup_quality, soup_comment, main_taste, main_temperature,main_look, main_portion, main_comment, dessert_quality, dessert_comment, overall_score, review_date) values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [lunch_id, user_id, soup_quality, soup_comment, main_taste, main_temperature,main_look, main_portion, main_comment, dessert_quality, dessert_comment, overall_score, review_date], (err, res) => {
                if(err) reject(err)
                resolve(res)
            })
        })
    }


    static getUserReviewCountForToday(user_id, date) {
        return new Promise((resolve, reject) => {
            conn.query("Select Count(*) as cnt from Review where review_date  = ? and user_id = ?", [date, user_id], (err, res) => {
                if(err) reject(err);
                resolve(res?.[0]?.cnt);
            })
        });
    }
}

module.exports = ReviewGateway;