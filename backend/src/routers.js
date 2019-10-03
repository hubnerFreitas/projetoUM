const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')

const routes = express.Router();
const upload = multer(uploadConfig);

//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para edicao, delete)
//req.body = Acessar corpo da requisicao (para criacao)

routes.post('/sessions', SessionController.store);

routes.get('/dashboard', DashboardController.show);
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('imagem'), SpotController.store);
routes.delete('/spots/:spot_id', SpotController.delete);

routes.post('/spots/:spot_id/bookings', BookingController.store);


module.exports = routes;