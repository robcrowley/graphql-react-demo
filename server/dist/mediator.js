"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.mediator = exports.topics = undefined;

var _apolloServerExpress = require("apollo-server-express");

var topics = exports.topics = {
   REVIEW_ADDED: "reviewAdded"
};

var mediator = exports.mediator = new _apolloServerExpress.PubSub();

exports.default = mediator;