const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// 🔐 CORS liberado para o frontend publicado
app.use(cors({
  origin: 'https://photo-opp-front.vercel.app',
}));
app.use(express.json());

// 📁 Cria a pasta de uploads, se necessário
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// 📷 Configuração do multer
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// 🛢️ Conexão com o banco de dados PostgreSQL
const db = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

// 📄 Cria tabela se não existir
db.query(`
  CREATE TABLE IF NOT EXISTS fotos (
    id SERIAL PRIMARY KEY,
    path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )
`).catch(err => console.error('Erro ao criar tabela:', err));


// 🔄 Rota para upload de imagem
app.post('/upload', upload.single('foto'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo não enviado' });
  }

  const imagePath = `/uploads/${req.file.filename}`;
  const host = `${req.protocol}://${req.headers.host}`;

  try {
    const result = await db.query(
      'INSERT INTO fotos (path) VALUES ($1) RETURNING id',
      [imagePath]
    );
    const id = result.rows[0].id;

    res.status(201).json({
      id,
      imageUrl: `${host}${imagePath}`
    });
  } catch (err) {
    console.error('Erro ao salvar no banco:', err);
    res.status(500).json({ error: 'Erro ao salvar no banco de dados' });
  }
});


// 📷 Busca imagem por ID
app.get('/photo/:id', async (req, res) => {
  const { id } = req.params;
  const host = `${req.protocol}://${req.headers.host}`;

  try {
    const result = await db.query('SELECT path FROM fotos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Imagem não encontrada' });
    }

    const imageUrl = `${host}${result.rows[0].path}`;
    res.json({ imageUrl });
  } catch (err) {
    console.error('Erro ao buscar imagem:', err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});


// 📊 Estatísticas por dia
app.get('/stats/daily', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        TO_CHAR(created_at, 'YYYY-MM-DD') as dia,
        COUNT(*) as total
      FROM fotos
      GROUP BY dia
      ORDER BY dia DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar estatísticas:', err);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});


// 📚 Lista de todas as fotos
app.get('/photos', async (req, res) => {
  const host = `${req.protocol}://${req.headers.host}`;

  try {
    const result = await db.query(`
      SELECT id, path, TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as criado_em
      FROM fotos
      ORDER BY created_at DESC
    `);

    const data = result.rows.map(row => ({
      ...row,
      url: `${host}${row.path}`
    }));

    res.json(data);
  } catch (err) {
    console.error('Erro ao buscar fotos:', err);
    res.status(500).json({ error: 'Erro ao buscar fotos' });
  }
});


// 🚀 Inicializa o servidor
app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});
