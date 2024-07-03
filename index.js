
import "dotenv/config";
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import {fileURLToPath} from 'url'; 
import path from "path";
import router from './src/routes/index.js';
import { inicializacionBD } from "./src/data/index.js";

const PORT = process.env.PORT || 3001;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(cors({ origin: 'https://biblioteca-backend-y7iu.vercel.app' }));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname,'public')));

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://biblioteca-backend-y7iu.vercel.app');
    res.header('Access-Control-Allow-Origin', '');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE, PATCH'
    );
    res.header('X-Total-Count', "1000");
    next();
});

app.use((_req, _res, next) => {
    inicializacionBD()
    next()
});

app.use('/api', router); 

app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto: ${PORT}`);
});

export default app;