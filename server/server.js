const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const roomController = require('./roomController');
const sourceController = require('./sourceController');
// const deviceController = require('./deviceController');

const app = express();
const router = express.Router();

mongoose.connect('mongodb://localhost/ero-config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname +'./../'));

//**************************************** Rooms API Routes */
router.route('/rooms')
  .get((req, res) => {
    roomController.getAllRooms((err, rooms) => {
      res.status(200).json(rooms);
    });
  })

  .post(
    roomController.addRoom,
    (req, res) => {
      res.status(200).json(res.locals.room);
    }
  )

  .delete(
    roomController.deleteRoom,
    (req, res) => {
      res.status(200).json(true);
    }
  );

//************************************* Sources API Routes */
router.route('/sources')
  .get((req, res) => {
    sourceController.getAllSources((err, sources) => {
      res.status(200).json(sources);
    });
  })

  .post(
    sourceController.addSource,
    (req, res) => {
      res.status(200).json(res.locals.source);
    }
  )

  .delete(
    sourceController.deleteSource,
    (req, res) => {
      res.status(200).json(true);
    }
  );

app.use('/api', router).listen(3000);