// jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


const keeperRoutes = require("./routes/keeperRoutes");

mongoose.connect("mongodb://localhost:27017/keeperDB");

app.use("/keeper", keeperRoutes);







app.listen(3030, ()=> console.log("Server is running at port 3030"));