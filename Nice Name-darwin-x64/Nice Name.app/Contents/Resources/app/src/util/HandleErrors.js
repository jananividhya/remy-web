const errorObj = {
    status: 200,
    statusText: 'OK'
};

export default (response) => {
    if (!response.ok) {
        errorObj.status = response.status;
        errorObj.statusText = response.statusText;

        throw new Error(errorObj);
    }

    return response.json();
};