"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customErrors_1 = require("./customErrors");
const errorHandler = async (err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof customErrors_1.ValidationError) {
        res.status(400);
        res.send(err.message);
    }
    else if (err instanceof customErrors_1.NotFoundError) {
        res.status(404);
        res.send(err.message);
    }
    else {
        res.status(500);
        res.send("Oops, something went wrong");
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map