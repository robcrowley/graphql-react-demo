"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.extractId = undefined;

var _graphqlRelay = require("graphql-relay");

var extractId = exports.extractId = function extractId(args, idSelector) {
    if (idSelector(args)) {
        return idSelector(args);
    }

    if (args.id) {
        var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(args.id),
            id = _fromGlobalId.id;

        if (!id || id === '') {
            throw new Error("No valid identifier extracted from " + args.id);
        }
        return id;
    }
    throw new Error("An id or " + idName + " argument is required");
};