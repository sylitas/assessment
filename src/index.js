import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { json, urlencoded } from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import ApolloServer from './middlewares/apolloServer';
import uploadRouter from './routers/upload';
import apolloMiddleware from './middlewares/apolloMiddleware';
import authRouter from './routers/auth';

const app = express();
const httpServer = http.createServer(app);

ApolloServer(httpServer).then((server) =>
  server.start().then(() => {
    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: true }));

    app.get('/', (req, res) => {
      res.json({ message: 'This page is empty to get anything' });
    });

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/apidoc', (req, res) => {
      res.sendFile(path.join(__dirname, 'public/index.html'));
    });

    app.use('/auth', authRouter);

    app.use('/graphql', expressMiddleware(server, apolloMiddleware));

    app.use('/upload', uploadRouter);

    app.use((req, res) => res.status(404).json({ error: 'Not found' }));

    httpServer.listen({ port: parseInt(process.env.APP_PORT, 10) }, () => {
      console.log(`Express Server: http://localhost:${process.env.APP_PORT}`);
      console.log(`Apollo Server:  http://localhost:${process.env.APP_PORT}/graphql `);
    });
  })
);
