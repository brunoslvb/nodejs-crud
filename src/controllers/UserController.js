const connection = require('../database/connection');

module.exports = {

    async insert(data) {

        if(data.email === undefined){

            return "ERRO";

        }

        const response = await connection('users').insert(data);

        return response;

    },

    async getAll(){

        const response = await connection('users').select();

        return response;
    }

}