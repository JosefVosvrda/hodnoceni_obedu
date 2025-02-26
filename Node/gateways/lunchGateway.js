const conn = require("../dbconn.js");

class LunchGateway {


    static getPastWeekLunches(){
        return new Promise((resolve, reject) => {
            let date = new Date().toJSON().slice(0, 10);
            let past_date = new Date(date.getMilliseconds() - 604_800_800).toJSON().slice(0, 10) //week offset;

            conn.query("select * from Lunch where serving_date between ? and ?", [date, past_date], (err, res) => {
                if(err) reject(err)
                resolve(res);
            })
        });
    }


    static registerDailyLunches(desc1, desc2){
        return new Promise((resolve, reject) => {

            let serving_date = new Date().toJSON().slice(0, 10) ;

            conn.query("Insert into Lunch(description, serving_date) values(?,?), (?,?)", [desc1, serving_date, desc2, serving_date], (err, res) => {
                if(err) reject(err)
                resolve(res);
            })
        });
    }

}

module.exports = LunchGateway;