const express = require('express');
const path = require('path');
const _ = require("lodash");
const { uuid } = require('uuidv4');
const router = express.Router();
const API_V1 = '/api/v1';
const dbUtils = require('../../utils/dbUtils');
const event = require('../../models/event');
const authUtils = require("../../utils/authUtils");
const transactions = require('../../models/transactions');
const errorCodes = require("../../utils/errorCodes")();

const createEvent = async (req, res, next) => {
  let isAuthenticated = authUtils.authChecker(req, res, next);
  if (isAuthenticated) {
    try {
      const payload = {
        name: req.body.name,
        estimate: req.body.estimate
      };
      let data = await dbUtils('event', event).CREATE(payload)
      if (data) {
        res.send(data);
      } else {
        res.status(500).send(`Error occurred while inserting event`)
      }
    } catch (e) {
      next(e);
    }
  }
};

const getAllEvent = async (req, res, next) => {
  let isAuthenticated = authUtils.authChecker(req, res, next);
  if (isAuthenticated) {
    let events = await dbUtils('event', event).FINDALL();
    if (events) {
      res.send(events);
    } else {
      res.status(500).send(`Error occurred while fetching event`)
    }
  }
}

const deleteEvent = async (req, res, next) => {
  let isAuthenticated = authUtils.authChecker(req, res, next);
  if (isAuthenticated) {
    const eventId = req.params.eventId;
    let deletedEvent = await dbUtils('event', event).DELETE(eventId);
    if (deletedEvent) {
      let data = await dbUtils('transactions', transactions).DELETEBYPARAMETER("eventId",eventId);
      console.log(deleteEvent)
      res.send("Deleted : " + eventId);
    } else {
      res.status(500).send(`Error occurred while deleting event`)
    }
  }
}

const getEventById = async (req, res, next) => {
  let isAuthenticated = authUtils.authChecker(req, res, next);
  if (isAuthenticated) {
    let eventId = req.params.eventId;
    let events = await dbUtils('event', event).FINDONE(eventId);
    if (events) {
      res.send(events);
    } else {
      res.status(500).send(`Error occurred while fetching event`)
    }
  }
}

const getTransactionsByEventdId = async (req, res, next) => {
  let isAuthenticated = authUtils.authChecker(req, res, next);
  if (isAuthenticated) {
    let eventId = req.params.eventId;
    let data = await dbUtils('transactions', transactions).FINDONEBYPARAMETER("eventId",eventId);
    if (data) {
      res.send(data);
    } else {
      res.status(500).send(`Error occurred while fetching transactions`)
    }
  }
}

const updateEvent = async (req, res, next) => {
  let isAuthenticated = authUtils.authChecker(req, res, next);
  if (isAuthenticated) {
    try {
      let eventId = req.params.eventId;
      const payload = {
        name: req.body.name,
        estimate: req.body.estimate
      };
      let data = await dbUtils('event', event).UPDATE(payload, eventId);
      if (data) {
        res.send(data);
      } else {
        res.status(500).send(`Error occurred while updating event`)
      }
    } catch (e) {
      next(e);
    }
  }
};


router
  .route(`/event`)
  .get(getAllEvent)
  .post(createEvent)

router
  .route(`/event/:eventId`)
  .put(updateEvent)
  .get(getEventById)
  .delete(deleteEvent);

router
  .route(`/event/:eventId/transactions`)
  .get(getTransactionsByEventdId)

module.exports = router;