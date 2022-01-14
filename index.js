import express from 'express';
import Contenedor from './clase.js';
const PORT = 8080;

const app = express();

let contenedor = new Contenedor('productos.txt');

app.get('/productos', async (req, res) => {
    let msg = {
        status: 'OK',
        message: 'Get All Products',
        code: 200,
        data: await contenedor.getAll()
    }

    res.end(JSON.stringify(msg));
});

app.get('/productoRandom', async (req, res) => {
    let msg = {
        status: 'OK',
        message: 'Get Random Product',
        code: 200, 
        data: await contenedor.getRandom()
    }
    res.end(JSON.stringify(msg));
})


const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${server.address().port}`);
})

server.on('error', error => console.log(error))
