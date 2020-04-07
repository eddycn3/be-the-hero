const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.listen(3334);

/**
 * Rotas e Recursos
 */

/**
  HTTP METHODS

  GET : Buisca de informações do back-end
  POST : Criação de objetos
  PUT : Alteração de infos 
  DELETE : Remover um objeto
  */

/**
  Tipos de Parametros

  *Query Params : Parametros  nomeados enviados na rota apos o "?"
    Filtros e paginação
    concatenação de parametos por '&'
    ex.: http://localhost:3333/users?name=Eduardo&
    
   =>>> request.query

  *Route Params: Parâmetro para identificar recursos
   localhost:333/users/:id 

  *Request Body: Corpo da requisição, utilizando para criar ou alterar recursos

   NODEMON - UTILIZADO PARA O RESTART AUTOMATICO DO SERVIDOR DEPOIS DE ALTERACAO NO CODIGO

   QUERRY BUILDER => KNEX.js
*/
