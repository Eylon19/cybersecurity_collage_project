function describeError(err) {
    if (!err) {
        return 'Unknown error';
    }
    const parts = [];
    if (err.code) {
        parts.push(err.code);
    }
    if (err.sqlMessage) {
        parts.push(err.sqlMessage);
    } else if (err.message) {
        parts.push(err.message);
    }
    return parts.length > 0 ? parts.join(' - ') : String(err);
}

function logError(context, err) {
    console.error(`${context}: ${describeError(err)}`);
}

module.exports = { logError, describeError };
