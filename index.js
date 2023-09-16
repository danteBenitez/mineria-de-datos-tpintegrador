import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { envConfig } from './src/config/env.js';

import { setupDatabase } from './src/database/setup.js';

import userRoutes from './src/routes/user.routes.js';

const app = express();

// Library middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Rutas
app.use('/api/users', userRoutes);

app.listen(envConfig.PORT, async () => {
    await setupDatabase();
    console.log(`Servidor escuchando en http://localhost:${envConfig.PORT}`);
})
