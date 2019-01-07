const fs = require('fs');
const generateQueryFromObject = require('./utils/generateQueryFromObject.js').generateQueryFromObject;

describe('successfully generates queries from the card features data files', () => {
    let mockedQueries = [
        {
            name: './test_queries/example.json',
            data: require('./test_queries/example.json'),
            mock: './test_queries/example.mock.gql'
        }
    ];

    mockedQueries.forEach((testObject) => {
        test(`generates correct query for ${testObject.name}`, done => {
            fs.readFile(testObject.mock, 'utf8', (err, data) => {
                let mockQuery = data;
                let generatedString = (generateQueryFromObject(testObject.data));

                expect(generatedString).toEqual(mockQuery);
                done();
            })
        })
    })
});