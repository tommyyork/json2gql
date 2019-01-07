const {
    generateQueryObject,
    formatOutputObject,
    calculateIndentation,
    addBrackets
} = require('./rawQueryUtils.js');

const generateQueryFromObject = (dataObject) => {
    const queryObject = generateQueryObject(dataObject);
    const unbracketedQuery = formatOutputObject(queryObject);
    const queryWithIndentation = calculateIndentation(unbracketedQuery);
    const bracketedQuery = addBrackets(queryWithIndentation);

    return bracketedQuery;
};

module.exports = {
    generateQueryFromObject
};