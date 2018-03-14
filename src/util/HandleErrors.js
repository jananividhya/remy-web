import Exception from './Exceptions';

const handleErrorThrown = (response) => {
    switch (response.status) {
        case 400:
            throw new Exception.sessionInvalidException(response.statusText);
        case 500:
            throw new Exception.serverUnavailableException(response.statusText);
        default:
            throw new Exception.serverUnavailableException(response.statusText);
    }
};

export default (response) => {
    if (!response.ok) {
        handleErrorThrown(response);
    }

    return response.json();
};