import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

// Configurar multer para guardar archivos
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        const avatarDir = join(__dirname, '../../public/avatars');
        if (!fs.existsSync(avatarDir)) {
            fs.mkdirSync(avatarDir, { recursive: true });
        }
        cb(null, avatarDir);
    },
    filename: (_req, _file, cb) => {
        cb(null, _file.originalname);
    }
});

const upload = multer({ storage });

// Deshabilitar caché para todas las respuestas
app.use((_req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
});

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, '../../public')));

// Configurar el servidor para mantener las conexiones abiertas
app.use((_req, res, next) => {
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Keep-Alive', 'timeout=60');
    next();
});

interface AvatarState {
    eyesClosedP1: boolean;
    mouthOpenP1: boolean;
    eyeBlinkLeftScoreP1: number;
    eyeBlinkRightScoreP1: number;
    jawOpenScoreP1: number;
    eyesClosedP2: boolean;
    mouthOpenP2: boolean;
    eyeBlinkLeftScoreP2: number;
    eyeBlinkRightScoreP2: number;
    jawOpenScoreP2: number;
}

let currentAvatarState: AvatarState = {
    eyesClosedP1: false,
    mouthOpenP1: false,
    eyeBlinkLeftScoreP1: 0,
    eyeBlinkRightScoreP1: 0,
    jawOpenScoreP1: 0,
    eyesClosedP2: false,
    mouthOpenP2: false,
    eyeBlinkLeftScoreP2: 0,
    eyeBlinkRightScoreP2: 0,
    jawOpenScoreP2: 0
};

app.post('/avatar-state', (req: Request, res: Response) => {
    currentAvatarState = req.body;
    res.json({ success: true });
});

app.get('/avatar-state', (_req: Request, res: Response) => {
    res.json(currentAvatarState);
});

app.post('/save-avatar/:characterId', upload.single('avatar'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Avatar server running at http://localhost:${port}`);
});
