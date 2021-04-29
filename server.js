/********************************************************************************* 
 * WEB700 – Assignment 04 
 * * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
 * * of this assignment has been copied manually or electronically from any other source 
 * * (including 3rd party web sites) or distributed to other students. * 
 * 
 * Name: Mahshid Farrahinia Student ID: 144091196  Date:2020/03/06 
 * 
 * Online (Heroku) Link: /* Heroku URL: https://glacial-meadow-63614.herokuapp.com/ 
 * * ********************************************************************************/


const express = require("express");
const path = require("path");
const data = require("./modules/serverDataModule.js");
const bodyParser = require("body-parser");
const HTTP_PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/htmlDemo", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});

app.get("/employees/add", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});

app.post("/employees/add", (req,res) =>{
    data.addEmployee(req.body).then(()=>{
        res.redirect("/employees")
    }).catch((err)=>{
        res.status(500).end();
    });
});

app.get("/employees", (req, res) => {
    if (req.query.department) {
        data.getEmployeesByDepartment(req.query.department).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    } else {
        data.getAllEmployees().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    }
});

app.get("/employee/:empNum", (req, res) => {
    data.getEmployeeByNum(req.params.empNum).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({message:"no results"});
    });
});

app.get("/managers", (req,res) => {
    data.getManagers().then((data)=>{
        res.json(data);
    });
});

app.get("/departments", (req,res) => {
    data.getDepartments().then((data)=>{
        res.json(data);
    });
});

app.use((req,res)=>{
    res.status(404).send("Page Not Found");
});


data.initialize().then(function(){
    app.listen(HTTP_PORT, function(){
        console.log("app listening on: " + HTTP_PORT)
    });
}).catch(function(err){
    console.log("unable to start server: " + err);
});

