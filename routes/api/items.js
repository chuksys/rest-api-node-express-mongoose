const express = require('express');
const Joi = require('joi');
const router = express.Router();

const Item = require('../../models/Item')

const validateItem = item => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(item);  
}


router.get('/', (req, res) => {
    return Item.find().sort({date: -1})
    .then(items => {
        res.status(200).send(items);
    }).catch(err => res.status(500).send(err))
})

router.get('/:id', (req, res) => {
    return Item.findById(req.params.id)
                .then(item => res.status(200).send(item))
                .catch(err => res.status(404).send(err))
})

router.post('/', (req, res) => {
    const { error } = validateItem(req.body)
    if(error) {
        return res.status(400).send(error.details);
    }

    const newItem = new Item({
        name: req.body.name
    })
    return newItem.save()
    .then(item => res.status(201).send(item))
    .catch(err => res.status(500).send(err))
})

router.put('/:id', (req, res) => {
    const { error } = validateItem(req.body)
    if(error) res.status(400).send(error)

    return Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {new: true})
        .then(item => res.status(201).send(item)
        .catch(err => res.status(404).send("Resource not found")))
})

router.delete('/:id', (req, res) => {
    return Item.findById(req.params.id)
                .then(item => item.remove()
                    .then(item => res.status(201).send(item))
                    .catch(err => res.status(500).send(err)))
                .catch(err => res.status(404).send('Resource not found'))
})

module.exports = router