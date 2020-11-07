const connection = require('../src/database/connection');
const UserController = require('../src/controllers/UserController');

const table = 'users';

beforeEach((done) => {

    connection(table).truncate().then(data => {
        // console.log('Clear');
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

    UserController.insert(data).then(res => {
        expect(res[0]).toBeGreaterThan(0);
        done();
    });

});


test('Deve retornar uma mensagem de erro ao tentar cadastrar um usuário sem e-mail', (done) => {

    const data = {
        name: 'Bruno'
    };

    UserController.insert(data).then(res => {

        expect(res).toEqual("ERRO");

        done();
    });

});

test('Deve retornar uma lista de usuários vazia', (done) => {

    UserController.getAll().then(res => {

        expect(res).toEqual([]);

        done();
    });

});
