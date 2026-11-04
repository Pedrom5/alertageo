require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const alertRoutes = require('./routes/alertRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'AlertaGeo está online.'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Erro interno do servidor.'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor AlertaGeo rodando na porta ${PORT}`);
});
