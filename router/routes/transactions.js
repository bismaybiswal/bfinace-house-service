const express = require('express');
const path = require('path');
const _ = require("lodash");
const router = express.Router();
const dbUtils = require('../../utils/dbUtils');
const transactions = require('../../models/transactions');
const authUtils = require("../../utils/authUtils");
const errorCodes = require("../../utils/errorCodes")();

const createTransaction = async (req, res, next) => {
  let isAuthenticated = authUtils.authChecker(req, res, next);
  if (isAuthenticated) {
    try {
      const payload = {
        eventId: req.body.eventId,
        category: req.body.category,
        type: req.body.type,
        desc: req.body.desc,
        amount: req.body.amount,
        transactionDate: req.body.transactionDate
      };
      let data = await dbUtils('transactions', transactions).CREATE(payload)
      if (data) {
        res.send(data);
      } else {
        res.status(500).send(`Error occurred while inserting transactions`)
      }
    } catch (e) {
      next(e);
    }
  }
};

const getAllTransactions = async (req, res, next) => {
  let isAuthenticated = authUtils.authChecker(req, res, next);
  if (isAuthenticated) {
    try {
      let data = await dbUtils('transactions', transactions).FINDALL();
      if (data) {
        res.send(data);
      } else {
        res.status(500).send(`Error occurred while fetching transactions`)
      }
    } catch (e) {
      next(e);
    }
  }
};

const deleteTransaction = async (req, res, next) => {
  let isAuthenticated = authUtils.authChecker(req, res, next);
  if (isAuthenticated) {
    try {
      const transactionId = req.params.transactionId;
      let deletedTransaction = await dbUtils('transactions', transactions).DELETE(transactionId);
      if (deletedTransaction) {
        console.log(deletedTransaction)
        res.send({msg:"Deleted : " + transactionId});
      } else {
        res.status(500).send(`Error occurred while deleting transaction`)
      }
    } catch (e) {
      next(e);
    }
  }
}

router
  .route(`/transactions`)
  .post(createTransaction)
  .get(getAllTransactions)

router
  .route(`/transactions/:transactionId`)
  .delete(deleteTransaction);

module.exports = router;