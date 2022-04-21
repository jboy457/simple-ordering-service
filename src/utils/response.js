class Response {
    constructor(responseHandler, statusCode, message, data) {
        this.responseHandler = responseHandler;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.send();
    }

    send() {
        let status = 'error';
        if (this.statusCode <= 400) status = 'success';
        if (this.statusCode === 500) this.message = 'Something went wrong';
        return this.responseHandler.status(this.statusCode).json({
            status,
            message: this.message,
            data: this.data,
        });
    }
}

module.exports = { Response };
