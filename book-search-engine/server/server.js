import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schemas';
import routes from './routes';
import { connect } from './config/connection';


const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,

});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);


connect().then(() => {
  server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });
});


