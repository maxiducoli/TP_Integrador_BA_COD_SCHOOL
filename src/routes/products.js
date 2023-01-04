const path = require('path');
const express = require('express');
const router = express.Router();
// Requqeimos multer
const multer = require('multer');
const controller = require('../controllers/productsController');
//  Almacenamiento de MULTER

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/products')
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName = Date.now() + fileExt;
    cb(null, fileName);
  },
})
//Traemos la función UPLOAD de la librería multer
const upload = multer({ 
  // Le pasamos la configuración del storage
  storage: storage,
  // Le pasamos la configuración del filtrador de archivos
  fileFilter: function (req, file, cb) {
    // Nombre del archivo original con tu extensión
    const originalFileName = file.originalname;
    // Extraemos la extensión del archivo original
    const fileExt = path.extname(originalFileName);
    //console.log(fileExt);
   // Filtramos la extensión pero antes la paso a mayúsculas, para validar correctamente
    if (![".JPG", ".PNG", ".GIF",".BMP",".JPEG"].includes(fileExt.toUpperCase()))
    {
     return cb(null,false);
    }
    cb(null, true);
  },
 });
router.get('/product/:id', controller.product);
router.get('/add', controller.add);
router.post('/add', upload.single("image"), controller.store);
router.get('/edit/:id', controller.edit);
router.post('/edit/:id', upload.single("image"), controller.update);
//router.get('/search/:resultado', controller.search);
router.get('/fileext', controller.fileext);
router.post('/product/delete/:id',controller.delete);
module.exports = router;