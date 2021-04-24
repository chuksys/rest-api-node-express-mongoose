const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('API Working')
})

router.post('/', (req, res) => {
    res.status(200).send('API Working')
})

router.put('/', (req, res) => {
    res.status(200).send('API Working')
})

router.delete('/', (req, res) => {
    res.status(200).send('API Working')
})

module.exports = router