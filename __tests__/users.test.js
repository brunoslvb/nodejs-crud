const connection = require('../src/database/connection');
const UserController = require('../src/controllers/UserController');

const table = 'users';

beforeEach((done) => {

  connection(table).truncate().then(data => {

    done();

  }).catch(err => {

    console.log(err);

  });

});

afterAll((done) => {

  connection.destroy();
  done();

});

describe('POST', () => {

  test('Deve cadastrar um usuário na base de dados', (done) => {

    const data = {
      name: 'Bruno',
      email: 'bruninho@gmail.com'
    };

    UserController.insert(data).then(res => {

      expect(res).toMatchObject({
        message: 'Usuário inserido com sucesso'
      });
      done();

    });

  });

  test('Deve retornar uma mensagem de erro ao tentar cadastrar um usuário sem e-mail', (done) => {

    const data = {
      name: 'Bruno'
    };

    UserController.insert(data).then(res => {

      expect(res).toMatchObject({
        message: 'Preencha o campo e-mail'
      });

      done();

    });

  });

});

describe('GET', () => {

  test('Deve retornar uma lista de usuários vazia', (done) => {

    UserController.getAll().then(res => {

      expect(res).toMatchObject({
        users: []
      });

      done();

    });

  });

  test('Deve retornar uma lista de usuários', async (done) => {

    const data = {
      name: 'Bruno',
      email: 'bruninho@gmail.com'
    };

    await connection(table).insert(data);

    UserController.getAll().then(res => {

      expect(res).toEqual(expect.objectContaining({
        users: expect.arrayContaining(
          [
            expect.objectContaining({

              id: expect.any(Number),
              name: expect.any(String),
              email: expect.any(String),
              created_at: expect.any(String)
            })
          ]
        )
      }
      ));

      done();

    });

  });

  test('Deve retornar um objeto com as informações do usuário especificado', async (done) => {

    const data = [
      {
        name: 'Bruno',
        email: 'bruninho@gmail.com'
      },
      {
        name: 'Teste',
        email: 'teste@teste.com'
      }
    ];

    await connection(table).insert(data);

    const id = 1;

    UserController.getById(id).then(res => {

      expect(res).toEqual(expect.objectContaining({
        id: 1,
        name: 'Bruno',
        email: 'bruninho@gmail.com',
        created_at: expect.any(String)
      }));

      done();

    });

  });

  test('Deve retornar uma mensagem de usuário não encontrado', (done) => {

    const id = 1;

    UserController.getById(id).then(res => {

      expect(res).toMatchObject({ message: 'Usuário não encontrado' });

      done();

    });

  });

});

describe('PUT', () => {

  test('Deve atualizar informações do usuário', async (done) => {

    const data = {
      name: 'Bruno',
      email: 'bruninho@gmail.com'
    };

    await connection(table).insert(data);

    delete data.name;
    data.email = 'bruno.silva@gmail.com';

    const id = 1;

    UserController.update(id, data).then(res => {

      expect(res).toMatchObject({
        message: 'Usuário atualizado com sucesso'
      });

      done();

    });

  });

  test('Deve retornar uma mensagem de erro ao tentar atualizar um usuário inexistente', (done) => {

    const data = {
      email: 'bruno.silva@gmail.com'
    };

    const id = 1;

    UserController.update(id, data).then(res => {

      expect(res).toMatchObject({
        message: 'Usuário não encontrado'
      });

      done();

    });

  });

});

describe('DELETE', () => {

  test('Deve deletar apenas um usuário da base de dados', async (done) => {

    const data = {
      name: 'Bruno',
      email: 'bruninho@gmail.com'
    };

    await connection(table).insert(data);

    const id = 1;

    UserController.delete(id).then(res => {

      expect(res).toMatchObject({
        message: 'Usuário deletado com sucesso'
      });

      done();

    });

  });

  test('Deve retornar uma mensagem de erro ao tentar deletar um usuário inexistente', (done) => {

    const id = 1;

    UserController.delete(id).then(res => {

      expect(res).toMatchObject({ message: 'Usuário não encontrado' });
      done();

    });

  });

});
