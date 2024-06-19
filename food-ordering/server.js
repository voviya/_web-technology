const http = require('http');
const url = require('url');
const fs = require('fs');
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });

async function handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    if (req.method === 'GET' && path === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.method === 'GET' && path === '/menu') {
        try {
            await client.connect();
            const db = client.db('foodOrderingDB');
            const collection = db.collection('menu');
            const menu = await collection.find().toArray();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(menu));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Database Error');
        }
    } else if (req.method === 'POST' && path === '/order') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const order = JSON.parse(body);
                await client.connect();
                const db = client.db('foodOrderingDB');
                const collection = db.collection('orders');
                await collection.insertOne(order);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Order received!' }));
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Database Error');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}

const server = http.createServer(handleRequest);

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
