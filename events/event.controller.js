const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const eventService = require('./event.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    eventService.getAll()
        .then(events => res.json(events))
        .catch(next);
}

function getById(req, res, next) {
    eventService.getById(req.params.id)
        .then(event => res.json(event))
        .catch(next);
}

function create(req, res, next) {
    eventService.create(req.body)
        .then(() => res.json({ message: 'Event Created' }))
        .catch(next);
}

function update(req, res, next) {
    eventService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Event updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    eventService.delete(req.params.id)
        .then(() => res.json({ message: 'Event deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
        users: Joi.array().items({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
        })
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
    });
    validateRequest(req, next, schema);
}
