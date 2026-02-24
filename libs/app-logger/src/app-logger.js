"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
exports.LogActivity = LogActivity;
const error_handler_1 = require("./error-handler");
class AppLogger {
    constructor(context) {
        this.contextName = context;
    }
    customLog(info) {
        const logMessage = {
            input_s: info.hasOwnProperty('input') ? info.input : '',
            output_s: info.hasOwnProperty('output') ? info.output : '',
            error_s: info.error ?? '',
            source_s: `${this.contextName}.${info.function}`,
        };
        if ('message' in info) {
            logMessage.message = info.message;
        }
        console.log(JSON.stringify(logMessage));
    }
}
exports.AppLogger = AppLogger;
function LogActivity() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const logger = new AppLogger(target.constructor.name);
            const logInfo = {
                function: propertyKey.toString(),
                input: args,
            };
            try {
                const output = await originalMethod.apply(this, args);
                logInfo.output = output;
                return output;
            }
            catch (error) {
                logInfo.error = (0, error_handler_1.errorHandler)(error);
                throw error;
            }
            finally {
                logger.customLog(logInfo);
            }
        };
        return descriptor;
    };
}
//# sourceMappingURL=app-logger.js.map