const fs = require('fs');
const json2gql = require('./utils/json2gql.js').json2gql;

describe('successfully generates queries from an example JSON object', () => {
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
                let generatedString = (json2gql(testObject.data));

                expect(generatedString).toEqual(mockQuery);
                done();
            })
        })
    })
});
