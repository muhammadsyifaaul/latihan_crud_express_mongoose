// utils/errorHandler.js
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, req, res, next) => {
    const { statusCode, message } = err;
    res.status(statusCode || 500).send(`
        <h1>Error ${statusCode || 500}</h1>
        <p>${message || 'Internal Server Error'}</p>
    `);
};

module.exports = {
    ErrorHandler,
    handleError
};
