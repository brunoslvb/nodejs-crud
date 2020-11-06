const connection = require('../src/database/connection');

const table = 'users';

beforeEach((done) => {

    connection(table).truncate().then(data => {
        console.log('Clear');
        done();
    }).catch(err => {
        console.log(err);
    });

});

afterAll((done) => {
    connection.destroy();
    done();
});

test('Deve cadastrar um usuário na base de dados', (done) => {

    const data = {
        name: 'Bruno',
        email: 'bruninho@gmail.com'
    };

    const response = connection(table).insert(data).then(data => {
        console.log(data);
        expect(data[0]).toBeGreaterThan(0);
        done();
    });
});