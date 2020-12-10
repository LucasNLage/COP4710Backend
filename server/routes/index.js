const { query } = require('express');
const express = require('express');
const db = require('../db');
const router = express.Router();



router.get('/users/', async (req, res, next) => {

    try {
        let results = await db.usersAll();
        res.json(results);
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }

});

router.get('/users/:id', async (req, res, next) => {

    try {
        let results = await db.usersOne(parseInt(req.params.id));
        res.json(results);
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }

});

router.get('/login/:username', async (req, res, next) => {

    try {
        let results = await db.login(req.params.username);
        console.log(results);
        res.json(results);
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
});


router.get('/events', async (req, res, next) => {

    try {
        let results = await db.eventsAll();
        res.json(results);
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }

});



router.get('/events/:location', async (req, res, next) => {

    try {
        let results = await db.eventsByLocation(req.params.location);
        console.log(results);
        res.json(results);
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
});

// router.get('/events/:id', async (req, res, next) => {

//     try {
//         let results = await db.eventsOne(parseInt(req.params.id));
//         res.json(results);
//     } catch (err) {
//         console.error(err)
//         res.sendStatus(500)
//     }

// });

router.get('/events/adminEvents/:adminUsername', async (req, res, next) => {

    try {
        let results = await db.eventsByAdmin(req.params.adminUsername);
        res.json(results);
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }

});

router.get('/events/userEvents/:username', async (req, res, next) => {

    try {
        let results = await db.eventsByUser(req.params.username);
        res.json(results);
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }

});


router.post('/addUser', async (req, res, next) => {

    let data = req.body;
    try {
        let results = await db.addUser(data);
        res.json(data);
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }

});

router.post('/joinEvent', async (req, res, next) => {

    let data = req.body;
    try {
        let results = await db.joinEvent(data);
        res.json(data);
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }

});


router.post('/events/createEvent', async (req, res, next) => {

    let data = req.body;
    try {
        let results = await db.addEvent(data);
        res.json(data);
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }

});



module.exports = router;