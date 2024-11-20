function parseErrors(data) {
    const errors = {};
    if (!('detail' in data) && !Array.isArray(data)) return errors;
    ('detail' in data ? data.detail : data).forEach(error => {
        const fieldName = error.loc[error.loc.length - 1];
        const fullMessage = error.msg;
        const errorMessage = fullMessage.includes(',') 
            ? fullMessage.split(',').slice(1).join(',').trim() 
            : fullMessage;
        errors[fieldName] = errorMessage;
    });
    return errors;
}

export default parseErrors;