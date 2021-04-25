const express = require('express');
const router = express.Router();

const Item = require('../../models/Item')

router.get('/', (req, res) => {
    return Item.find().sort({date: -1})
    .then(items => {
        res.status(200).send(items);
    }).catch(err => res.status(500).send(err))
})

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })
    return newItem.save()
    .then(item => res.status(201).send(item))
    .catch(err => res.status(500).send(err))
})

router.put('/:id', (req, res) => {
    return Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {new: true}).then(item => res.status(201).send(item))
})

router.delete('/:id', (req, res) => {
    return Item.findByIdAndDelete(req.params.id)
    .then(item => res.status(201).send(item))
})

module.exports = router