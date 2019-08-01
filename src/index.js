require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const typeDefs = importSchema('./src/schema.graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { AuthDirective } = require('./resolvers/directive');
const verifyToken = require('./utils/verifyToken');
const mongoose = require('mongoose');

//Para conectarse a la base de datos de Mongoose
//useNewUrlParser: true-->Para decirle que se esta parseando una url de string
mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true}, (err)=>{
    if(!err){
        console.log('Mongo conectado correctamente.');
    }
});

const { getAllPosts, getPost, getUsers } = require('./resolvers/Querys');
const { createPost, createUser, login, addPhoto } = require('./resolvers/Mutations');

const resolvers = {
    Query: {
      //saludo: (root, args) => `Hola ${args.name}`,
      getAllPosts,
      getPost,
      getUsers
    },
    Mutation: {
        createPost,
        createUser,
        login,
        addPhoto
    }
}
  
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives:{
    auth:AuthDirective
  }
})


const server = new GraphQLServer({ schema, context: async({ request })=>verifyToken(request) })
server.start(() => console.log('Server is running on localhost:4000'))