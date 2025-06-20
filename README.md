# PhotoOpp - Frontend

Este é o frontend do projeto **PhotoOpp**, uma aplicação interativa para captura e compartilhamento de fotos em eventos.

## 🔧 Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [QRCode Generator](https://www.npmjs.com/package/qrcode.react)

## 🚀 Funcionalidades

- Captura de imagem via webcam
- Upload da imagem para o backend
- Exibição de QR Code para download da imagem
- Tela de agradecimento após envio
- Tela de visualização de todas as imagens (admin)
- Integração com backend para estatísticas e fotos

## 📦 Instalação

```bash
cd frontend
npm install
```

## ▶️ Execução em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🌐 Variáveis de Ambiente

Crie um arquivo `.env.local` com a seguinte variável:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> Altere para a URL do backend em produção se necessário.

## 📁 Estrutura de Diretórios

- `pages/` – Páginas da aplicação (index, view, admin, etc)
- `components/` – Componentes reutilizáveis (Header, Footer, WebcamCapture)
- `services/` – Funções que acessam a API do backend
- `public/` – Arquivos públicos (favicon, imagens)

## 🖼️ Captura de Imagem

A captura é feita com `Webcam` e convertida para Base64, enviada para a rota `/upload`.

## 📄 Licença

MIT
