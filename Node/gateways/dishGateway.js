const conn = require("../dbconn.js");

class DishGateway {
    static getAllForDishType(type_id) {
        return new Promise((resolve, reject) => {
            conn.query("Select name, id from from Dish where dish_type_id = ?", [type_id], (err, res) => {
                resolve(res);
            })
        });
    }


    static getAllTypes() {
        return new Promise((resolve, reject) => {
            conn.query("Select * from DishType", (err, res) => {
                resolve(res);
            })
        });
    }


    static getAllDishes() {
        return new Promise((resolve, reject) => {
            conn.query("Select * from Dish", (err, res) => {
                resolve(res);
            })
        });
    }


}

module.exports = DishGateway;