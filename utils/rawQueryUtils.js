const deepmerge = require('deepmerge');
const prettyjson = require('prettyjson');

const notArrayIndex = (x) => !parseInt(x, 10) && x !== '0';

const generateClosingBrackets = (indentation, indentationDifference) => {

    // given a current level of indentation and a target indentation,
    // generate the closing curly brackets to insert into our unbracketed
    // query.

    let closingBrackets = '';

    for (let i = indentationDifference - 2; i >= 0; i -= 2) {
        // something wrong here
        closingBrackets+= `${Array.from({ length: indentation + i }, () => ' ').join('')}}${i === 0 ? '' : '\n'}`
    }

    return closingBrackets;
};

const generateQueryObject = (input) => {
    // given an input GraphQL-style data object,
    // generate an unbracketed query
    //
    // i.e.:
    // shortName
    // cardFeatures
    //     content
    //         key
    //         header
    //         desc
    //             type
    //             text

    const output = {};

    if (Array.isArray(input)) {
        input = deepmerge.all(input)
    }

    const keys = input ? Object.keys(input) : [];

    keys.forEach((key) => {
        if (input[key] !== input && notArrayIndex(key) && key !== 'specialKeys') {
            output[key] = generateQueryObject(input[key]);
        }
    });

    return output;
};

const formatOutputObject = (queryObject) => {
    const regex = /: /g;

    let unprocessedQuery = prettyjson.render(
        queryObject, {defaultIndentation: 2, noColor: true}
    ).replace(regex, '');

    // special cases for the reinforcement banner

    const specialCases = [
        /businessReinforcementBanner/g,
        /corporateReinforcementBanner/g
    ];
    specialCases.forEach((x) => unprocessedQuery = unprocessedQuery.replace(x, 'reinforcementBanner'));
    processedQuery = unprocessedQuery;

    return processedQuery;
};

const calculateIndentation = (stringBlock) => {
    let individualLines = stringBlock.split('\n');

    return individualLines.map((queryLine) => {
        let newObj = {};
        newObj.content = queryLine;
        newObj.indentation = queryLine.split('').filter((y) => y === ' ').length;

        return newObj;
    });
};

const addBrackets = (individualLines) => {
    let currentIndent = 0;
    individualLines.forEach((x, i, arr) => {
        if (arr[i + 1] && arr[i + 1].indentation > arr[i].indentation) {
            x.content = `${x.content} {`;
            currentIndent+=2;
        } else if (arr[i + 1] && arr[i + 1].indentation < arr[i].indentation) {

            let indentationDifference = arr[i].indentation - arr[i + 1].indentation;
            currentIndent = arr[i + 1].indentation;
            let closingBrackets = generateClosingBrackets(currentIndent, indentationDifference);


            x.content = `${x.content}\n${closingBrackets}`
        }

        if (i === arr.length - 1) {
            let finalClosingBrackets = generateClosingBrackets(0, currentIndent);
            x.content = `${x.content}\n${finalClosingBrackets}`
        }
    });

    return individualLines.map((queryLine) => queryLine.content).join('\n');
};

module.exports = {
    generateQueryObject,
    formatOutputObject,
    calculateIndentation,
    addBrackets,
};