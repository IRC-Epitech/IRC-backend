const express = require('express');
const router = express.Router();

// Exemple de route
router.get('/', (req, res) => {
    res.send('Bienvenue sur mon application Express avec Socket.IO');
});

module.exports = router;
