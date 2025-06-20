# PhotoOpp - Backend

Este é o backend da aplicação **PhotoOpp**, responsável por receber imagens, armazená-las, servir os arquivos, e fornecer estatísticas.

## 🔧 Tecnologias Utilizadas

- Node.js + Express
- PostgreSQL com `pg`
- Multer para upload de arquivos
- CORS configurado para frontend
- dotenv para variáveis de ambiente

## 🚀 Funcionalidades

- Upload de imagens com armazenamento em disco
- Associação de ID único para cada imagem
- Servir imagens individualmente
- Geração de estatísticas diárias
- Listagem de imagens para visualização (admin)

## 📦 Instalação

```bash
cd backend
npm install
```

## ▶️ Execução

```bash
npm start
```

Servidor estará disponível em: [http://localhost:3001](http://localhost:3001)

## 🌐 Variáveis de Ambiente

Crie um arquivo `.env` com os dados do banco:

```
PORT=3001
BASE_URL=http://localhost:3001

DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=photoopp_db
DB_SSL=false
```

## 🧪 Endpoints

| Método | Rota              | Descrição                         |
|--------|-------------------|-----------------------------------|
| POST   | `/upload`         | Faz upload da imagem              |
| GET    | `/photo/:id`      | Retorna imagem por ID             |
| GET    | `/photos`         | Lista todas as imagens            |
| GET    | `/stats/daily`    | Retorna contagem diária de fotos |

## 🗂️ Estrutura

- `index.js` – Arquivo principal do servidor
- `upload/` – Pasta onde as imagens são salvas
- `database.js` – Conexão com PostgreSQL
- `models/` – Scripts SQL e helpers de banco

## 🗃️ Banco de Dados

Tabela `photos` com os campos:

```sql
CREATE TABLE photos (
  id UUID PRIMARY KEY,
  filename TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 📄 Licença

MIT
