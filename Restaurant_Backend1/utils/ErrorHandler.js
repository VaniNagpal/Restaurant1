class ErrorHandler extends Error {
    constructor(statusCode, message = "Code Fatt Gaya", errors = [], stack) {
        super(message); // Call the parent class constructor
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.message = message;
        this.success = false;
    }
}

module.exports = ErrorHandler;
