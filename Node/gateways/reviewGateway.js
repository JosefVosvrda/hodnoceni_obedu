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




    static createReview(lunch_id, user_id, soup_quality, main_taste, main_temperature,main_look, main_portion, main_comment, desert_quality, desert_comment, overall_score) {
        return new Promise((resolve, reject) => {
            conn.query("Insert into Review(lunch_id, user_id, soup_quality, main_taste, main_temperature,main_look, main_portion, main_comment, desert_quality, desert_comment,overall_score) values(?,?,?,?,?,?,?,?,?,?,?)", [lunch_id, user_id, soup_quality, main_taste, main_temperature,main_look, main_portion, main_comment, desert_quality, desert_comment, overall_score], (err, res) => {
                if(err) reject(err)
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

module.exports = ReviewGateway;