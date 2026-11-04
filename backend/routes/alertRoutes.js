const express = require('express');
const { getAlerts, createAlert } = require('../controllers/alertController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAlerts);
router.post('/', authMiddleware, authorizeRoles('administrador', 'operador', 'cidadao'), createAlert);

module.exports = router;
