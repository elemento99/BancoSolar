import 'dotenv/config';
import express from 'express';
import bancoSolarRoute from './routes/bancosolar.route.js';
import transferenciaRoute from './routes/transferencia.route.js';
const __dirname = import.meta.dirname;
import path from 'path';
const app = express();

//habiliar req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//middlewares-- hacemos el cambio de la ruta sólo en index, no en las rutas de route (arreglar esto)
app.use('/usuarios', bancoSolarRoute) 
app.use('/transferencia', transferenciaRoute) 

// archivos estáticos (public)
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','assets', 'index.html'));
  });


const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Servidor funcionando en http://localhost:${PORT}`))












