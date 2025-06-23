const express = require('express');
const router = express.Router();
const createConnection = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const conn = await createConnection();
    const result = await conn.execute('SELECT sysdate FROM dual');
    await conn.close();
    res.json({ success: true, date: result.rows[0] });
  } catch (error) {
    console.error('Error al conectar:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
