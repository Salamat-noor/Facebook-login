//////////////////   required libraries or frameworks are given here  /////////////////
const express = require("express");
const app = express();
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
dotenv.config();
app.set("view engine", "ejs");
const connection = require("./config/db");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//////////////       express for connect with browser

app.get("/", (req, res) => {
    res.redirect("/index.html");
});
///////////////////////////////////////////////
// app.get("/delete-data", (req, res) => {
//     const deleteQuery = "delete from nooriest where id=?";

//     connection.query(deleteQuery, [req.query.id], (err, rows) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.redirect("/data");
//         }
//     });
// });
///////////////////////////////////////////////////////
app.get("/data", (req, res) => {
    connection.query("select * from nooriest", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render("read.ejs", { rows });
        }
    });
});
//////////////////////////////////////////////////////////
app.get("/update-data", (req, res) => {
    connection.query("select * from nooriest where id=?", [req.query.id], (err, eachRow) => {
        if (err) {
            console.log(err);
        } else {
            results = JSON.parse(JSON.stringify(eachRow[0]));
            console.log(results);
            res.render("edit.ejs", { results });
        };
    });
});
////////////////////////////////////////////////
app.post("/final-update", (req, res) => {
    // console.log(req.body);
    const id = req.body.hidden_id;
    const name = req.body.name;
    const email = req.body.email;

    const updateQuery = "update nooriest set name=?, email=? where id=?";

    try {
        connection.query(updateQuery, [name, email, id], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/data");
            }
        });
    }
    catch (error) {
        console.log(error);
    };
});
////////////////////////////////////////////////////
app.post("/index", (req, res) => {
    console.log(req.body);

    const name = req.body.name;
    const password = req.body.email;

    try {
        connection.query("INSERT INTO nooriest (name,password) VALUES(?,?)",
            [name, password],
            (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/data");
                }
            });
    }
    catch (error) {
        console.log(error);
    };
});
///////////////////////////////////////////////////////
app.listen(process.env.PORT || 4000, (error) => {
    if (error) throw error;
    console.log(`Server running on ${process.env.PORT}`);
});