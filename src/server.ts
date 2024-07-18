import { createServer } from 'http';
import client from './bot/client';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url!, true);

            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }
    })
        .once('error', (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log('> Website Ready');
        });
});

import env from './env'; // I need to import it after creating the server for process.env to load, I think.
import sequelize from './database/sequelize';

sequelize.authenticate().then(() => console.log('> Database Ready'));
client.start(env.TOKEN).then(() => console.log('> Bot Ready'));
