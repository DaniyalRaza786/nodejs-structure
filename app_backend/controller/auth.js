const {users} = require("../db/models");
const bcrypt = require("bcrypt");
const { createToken, verifyAccessToken, createAccessToken } = require("../helper/helper");
const path = require("path");
const { Op, literal } = require("sequelize");
const { errorResponse, successResponse } = require("../utils/responseHandler.js");
const { errorName, successName } = require("../utils/constants.js");
const getErrorCode = require("../utils/error.js");
const { sequelize } = require("../db/models/index.js");

const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    var { accessToken, refreshToken } = await createAccessToken(refresh_token);
    return successResponse(
      res,
      successName.TOKENREFRESH,
      { access_token: accessToken, refresh_token: refreshToken },
      200
    );
  } catch (error) {
    return errorResponse(res, getErrorCode(errorName.INTERNALSERVER));
  }
};

const signUp = async (req, res) => {

    try {
        const { first_name, last_name, email, password } = req.body;

        if (!first_name || !last_name) {
            return errorResponse(res, getErrorCode(errorName.INVALIDDETAILS));
        }

        const existing = await users.findOne({ where: { email } });

        if (existing) return errorResponse(res, getErrorCode(errorName.ALREADYEXIST));
        const user = await users.create({ first_name, last_name, password, email  });

        const payload = { id: user.id, email: user.email };
        const tokens =  await createToken(payload);
      
        return successResponse(
            res,
            successName.REGISTER,
            {
                access_token : tokens.accessToken,
                refresh_token: tokens.refreshToken,
                user: user
            },
            200
        );
  } catch (error) {
        
        return errorResponse(res, getErrorCode(errorName.INTERNALSERVER));
  }

};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ where: { email } });

        if(!user || !(await bcrypt.compare(password, user.password))){
            return errorResponse(
                res,
                getErrorCode(errorName.INVALIDCREDENTIALS)
            );
        }

        const payload = { id: user.id, email: user.email };
        const tokens = await createToken(payload);
       
        return successResponse(
            res,
            successName.LOGIN,
            {
                access_token: tokens.accessToken,
                refresh_token: tokens.refreshToken,
                user
            },
            200
        );
        
    } catch (error) {
        return errorResponse(res, getErrorCode(errorName.INTERNALSERVER));
    }
};

module.exports = {
    refreshToken,
    signUp,
    login
};