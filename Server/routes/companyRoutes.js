const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const { isAdmin } = require("../middleware/authorization");

const Company = require("../models/company");

// all these routes should later be admin exclusive except the get one

// register a company

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const {companyName, field, location, scale, description} = req.body; // scale : startup and all
    const obj = {companyName: companyName, field: field, location: location, scale: scale, description: description};
    const company = new Company(obj);
    const response = await company.save();
    res.status(200).send({msg: "Company registered"});
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// get single company data

router.get("/:companyId", isLoggedIn, async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    const companyData = await Company.findById(companyId);
    res.status(200).json(companyData);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// get all the companies data

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const companies = await Company.find({});
    res.status(200).json(companies);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// edit company data

router.put("/:companyId", isLoggedIn, async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    const {companyName, field, location, scale, description} = req.body; // add checks for each field here later
    const obj = {companyName: companyName, field: field, location: location, scale: scale, description: description};
    const response = await Company.findByIdAndUpdate(companyId, obj);
    res.status(200).send({msg: "updated successfully"});
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

// unregister the company

router.delete("/:companyId", isLoggedIn, async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    const response = await Company.findByIdAndDelete(companyId);
    res.status(200).send({msg: "successfully deleted"});
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "An error occured" });
  }
});

module.exports = router;
