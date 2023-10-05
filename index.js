import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { envConfig } from './src/config/env.js';

import { setupDatabase } from './src/database/setup.js';

import userRoutes from './src/routes/user.routes.js';
import surveyRoutes from './src/routes/survey.routes.js';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Library middleware
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));
app.use(express.static(path.join(__dirname, './public')));

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Rutas
app.use('/api/users', userRoutes);
app.use('/', surveyRoutes);

app.listen(envConfig.PORT, async () => {
    await setupDatabase();
    console.log(`Servidor escuchando en http://localhost:${envConfig.PORT}`);
})
