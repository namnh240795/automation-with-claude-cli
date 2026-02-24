"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const errorHandler = (error) => {
    if (error instanceof axios_1.AxiosError) {
        let config, headers;
        if (error.config) {
            headers = {
                ...(error.config.headers ?? {}),
                Authorization: '***********',
                'Ocp-Apim-Subscription-Key': '***********',
            };
            config = { ...error.config, headers };
        }
        return {
            message: error.message,
            name: error.name,
            code: error.code,
            config,
            response: error.response
                ? {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data,
                }
                : undefined,
            status: error.response?.status,
        };
    }
    else if (error instanceof common_1.BadRequestException) {
        return {
            message: error.message,
            name: error.name,
            response: error.getResponse(),
        };
    }
    else if (error instanceof Error) {
        return {
            message: error.message,
            name: error.name,
            stack: error.stack,
        };
    }
    return {
        message: 'Unknown Exception',
    };
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map