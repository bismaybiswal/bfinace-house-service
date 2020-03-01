const express = require('express');
const _ = require("lodash");
const utils = require("../../utils/utils");
const authUtils = require("../../utils/authUtils");
const errorCodes = require("../../utils/errorCodes")();
const router = express.Router();
const URL_PATH = '/auth';
const SECRET_PIN = '1321';


const login = async (req, res, next) => {
  let err;
  try {
    //validate req body
    const PIN = req.body.pin;
    let isValidPin = utils.validatePin(PIN)
    if (isValidPin && _.isEqual(SECRET_PIN, PIN)) {
      //generate token
      authUtils.generateAccessToken().then(token => {
        if (!_.isUndefined(token)) {
          let response = {
            access_token: token
          }
          res.json(response);
        } else {
          err = new Error(`Unable to generate access token`);
          err.status = 500;
          err.code = errorCodes.INTERNAL_ERROR;
          next(err);
        }
      }).catch(err => {
        console.log(err)
        err = new Error(`Unable to generate access token`);
        err.status = 500;
        err.code = errorCodes.INTERNAL_ERROR;
        next(err);
      })

    } else {
      err = new Error(`Invalid pin`);
      err.status = 400;
      err.code = errorCodes.BAD_REQUEST;
      next(err);
    }


  } catch (e) {
    next(e);
  }
};

const verifyToken = (req, res, next) => {
  try {
    let response;
    let isAuthenticated = authUtils.authChecker(req, res, next);
    if (isAuthenticated) {
      response = {
        isValid: true
      }
    } else {
      response = {
        isValid: false
      }
    }
    res.json(response);
  } catch (err) {
    next(err)
  }

}

router
  .route(`${URL_PATH}/login`)
  .post(login);

router
  .route(`${URL_PATH}/verifytoken`)
  .post(verifyToken);

module.exports = router;