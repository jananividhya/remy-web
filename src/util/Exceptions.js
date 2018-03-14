const SessionInvalidException = (message) => {
    this.message = message;
    this.conversation = "/signin";
    this.name = "INVALID_SESSION";
};

const ServerUnavailableException = (message) => {
    this.message = message;
    this.name = "SERVER_UNAVAILABLE";
};

const Exception = {
    "serverUnavailableException": ServerUnavailableException,
    "sessionInvalidException": SessionInvalidException
};

export default Exception;