const alertas = [
  {
    id: 1,
    titulo: 'Alagamento na rua principal',
    categoria: 'alagamento',
    nivel: 'alto',
    descricao: 'Água acumulada próximo à avenida central após a chuva intensa.',
    latitude: -29.1667,
    longitude: -51.1794,
    status: 'em análise'
  },
  {
    id: 2,
    titulo: 'Erosão em encosta residencial',
    categoria: 'erosao',
    nivel: 'muito alto',
    descricao: 'Presença de rachaduras na encosta e risco de deslizamento.',
    latitude: -29.1612,
    longitude: -51.1848,
    status: 'monitoramento'
  }
];

function getAlerts(req, res) {
  return res.status(200).json(alertas);
}

function createAlert(req, res) {
  const { titulo, categoria, nivel, descricao, latitude, longitude } = req.body;

  if (!titulo || !categoria || !nivel || !descricao) {
    return res.status(400).json({ message: 'Título, categoria, nível e descrição são obrigatórios.' });
  }

  const novoAlerta = {
    id: alertas.length + 1,
    titulo,
    categoria,
    nivel,
    descricao,
    latitude: latitude || null,
    longitude: longitude || null,
    status: 'novo'
  };

  alertas.push(novoAlerta);

  return res.status(201).json({
    message: 'Alerta cadastrado com sucesso.',
    alerta: novoAlerta
  });
}

module.exports = {
  getAlerts,
  createAlert
};
