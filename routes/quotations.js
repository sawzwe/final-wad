var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Quotation = require("../db/models/quotations");

/* GET quotation history listing. */
router.get("/", (req, res, next) => {
  Quotation.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      // console.log(res);
      res.json(result);
    }
  });
});


// Create new quotation
router.post("/", (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  console.log(data.priceperunit)
  console.log(data.quantity)
  const quotation1 = new Quotation({
    item: data.item,
    priceperunit: data.priceperunit,
    quantity: data.quantity,
    //amount: data.amount,
    //date: data.date
      amount: data.quantity * data.priceperunit,
      date: new Date()
  });

  quotation1.save((err, newInstance) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.json(newInstance);
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params['id'] // use ID from the route parameter
  // const id = req.body._id;
  console.log("Delete this id ",id)
  console.debug('Quotation ID to delete',id);
  Quotation.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});


/*router.delete("/", (req, res, next) => {
  //const id = req.params['id'] // use ID from the route parameter
  const id = req.body._id;
  console.log("Delete this id ",id)
  Quotation.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});*/

//Update whole object or partially (Patch)
router.put("/", async (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const id=data._id;
  delete data._id;
  console.debug(data);

  Quotation.findByIdAndUpdate(id, data, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});
module.exports = router;
