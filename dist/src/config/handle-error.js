"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const custom_error_1 = require("../domain/entities/errors/custom.error");
const handleError = (error, res) => {
    if (error instanceof custom_error_1.CustomError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
    }
    console.error(error);
    console.error({ error });
    res.status(500).json({ error: 'Internal server error' });
};
exports.handleError = handleError;
//# sourceMappingURL=handle-error.js.map