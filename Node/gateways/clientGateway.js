﻿const conn = require("../dbconn.js");

class ClientGateway {

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


    static getUserNewsletter(user_id) {
        return new Promise((resolve, reject) => {
            conn.query("Select username, newsletter from User where id = ?", [user_id], (err, res) => {
                if (err) reject(err);
                resolve(res?.[0])
            })
        })
    }


    static createUser(username) {
        return new Promise((resolve, reject) => {
            conn.query("Insert into User(username, newsletter) values(?,?)", [username, false], (err, res) => {
                if (err) reject(err);
                resolve(res.insertId)
            })
        })
    }

    static getUserByName(username) {
        return new Promise((resolve, reject) => {
            conn.query("Select * from User where username = ?", [username], (err, res) => {
                if (err) reject(err);
                resolve(res?.[0])
            })
        })
    }

    static updateUserNewsletter(newsletter, user_id) {
        return new Promise((resolve, reject) => {
            conn.query("Update User set newsletter = ? where id = ?", [newsletter === 'true' ? 1 : 0, user_id], (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        });
    }


}

module.exports = ClientGateway;