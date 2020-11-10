const connection = require('../database/connection');

module.exports = {

  async insert (data) {

    if (data.email === undefined) {

      return { message: 'Preencha o campo e-mail' };

    }

    await connection('users').insert(data);

    return { message: 'Usuário inserido com sucesso' };

  },

  async getAll () {

    const users = await connection('users').select();

    return { users: users };

  },

  async getById (id) {

    const user = await connection('users').select().where('id', id).first();

    if (!user) {

      return { message: 'Usuário não encontrado' };

    }

    return user;

  },

  async update (id, data) {

    const user = await connection('users').select().where('id', id).first();

    if (!user) {

      return { message: 'Usuário não encontrado' };

    }

    await connection('users').update(data).where('id', id);

    return { message: 'Usuário atualizado com sucesso' };

  },

  async delete (id) {

    const user = await connection('users').select().where('id', id).first();

    if (!user) {

      return { message: 'Usuário não encontrado' };

    }

    await connection('users').delete().where('id', id);

    return { message: 'Usuário deletado com sucesso' };

  }

};
