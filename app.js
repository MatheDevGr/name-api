const express = require('express');
const app = express();
const nomesRoutes = require('./routes/names');

app.use(express.json());

app.use('/api/nomes', nomesRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
