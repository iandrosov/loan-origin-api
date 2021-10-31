/*
 * Copyright (c) 2021 Igor Androsov All rights reserved.
 * @author Igor Androsov
 * @version 1.0
 */

/**
 * This file defines configuration variables for application.
 */
'use strict';

module.exports = {

  /**
   * Secret Key - replace with real seed Key
   */
  secret: 'mytemporarysecretkey',

  /**
   * Amount of details logged to console depends on this setting.
   * Possible values are: silly, debug, verbose, info, warn, error
   */
  LOG_LEVEL: 'debug',

  /**
   * Port at which API server should be listening
   */
  PORT: process.env.PORT || 8080,

  /**
   * Postresql database connection string.
   */
  //DATABASE_URL: process.env.DATABASE_URL || '<CONNECT STRING>',
  
  /**
   * String returned in "status" field of successfull responses.
   */
  SUCCESS_RESULT_STRING: 'Success',

  /**
   * String returned in "status" field of failing responses.
   */
  FAILURE_RESULT_STRING: 'Failure',

  /**
   * It is date format. See http://momentjs.com/docs/#/displaying/ for supported formats.
   */
  DATE_FORMAT: 'YYYY-MM-DD',

  /**
   * It is timestamp format. See http://momentjs.com/docs/#/displaying/ for supported formats.
   */
  TIMESTAMP_FORMAT: 'YYYY-MM-DD HH:mm:ss',

  /**
   * String returned in "resultDetails" field of responses with invalid path.
   */
  HTTP_400_MESSAGE: '400 Bad Request',
  HTTP_401_MESSAGE: '401 Not Authorized',
  HTTP_404_MESSAGE: '404 Not Found',
  HTTP_403_MESSAGE: '403 Forbidden',

};
