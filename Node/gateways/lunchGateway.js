const conn = require("../dbconn.js");

class LunchGateway {


    static getPastWeekLunches() {
        return new Promise((resolve, reject) => {
            let date = new Date().toJSON().slice(0, 10);
            let past_date = new Date(new Date().getTime() - 604_800_800).toJSON().slice(0, 10) //week offset;

            conn.query("select * from Lunch where serving_date between ? and ?", [past_date, date], (err, res) => {
                if (err) reject(err)
                resolve(res);
            })
        });
    }


    static getScoreSummaryForLunch(lunch_id) {
        return new Promise((resolve, reject) => {

            conn.query("select description, serving_date, round(avg(soup_quality),1) as soup_quality_avg , round(avg(main_taste),1) as main_taste_avg, round(avg(main_look),1) as main_look_avg, \n" +
                "round(avg(main_temperature),1) as main_temperature_avg,  round(avg(main_portion),1) as main_portion_avg, round(avg(dessert_quality),1) as dessert_quality_avg\n" +
                "from Lunch inner join Review on Lunch.id = Review.lunch_id where Review.lunch_id = ?\n" +
                "group by Lunch.description, Lunch.serving_date", [lunch_id], (err, res) => {
                if (err) reject(err)
                resolve(res?.[0]);
            });
        });
    }


    static getOverallScoreSummaryForAllLunches() {
        return new Promise((resolve, reject) => {

            conn.query("select Lunch.description, Lunch.id, Lunch.serving_date, round(avg(Review.overall_score),1) as overall_score_avg from Review inner join Lunch on Lunch.id = Review.lunch_id group by Lunch.description, Lunch.id, Lunch.serving_date", (err, res) => {
                if (err) reject(err)
                resolve(res);
            });
        });
    }

    static getCommentsForLunch(lunch_id)
    {
        return new Promise((resolve, reject) => {

            conn.query("select soup_comment, main_comment, dessert_comment from Review where lunch_id = ?", [lunch_id], (err, res) => {
                if (err) reject(err)
                resolve(res);
            });
        });
    }


    static registerDailyLunches(desc1, desc2) {
        return new Promise((resolve, reject) => {

            let serving_date = new Date().toJSON().slice(0, 10);

            conn.query("Insert into Lunch(description, serving_date) values(?,?), (?,?)", [desc1, serving_date, desc2, serving_date], (err, res) => {
                if (err) reject(err)
                resolve(res);
            })
        });
    }

}

module.exports = LunchGateway;