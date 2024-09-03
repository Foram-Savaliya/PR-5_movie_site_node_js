const express = require('express');
const { View, Add, insert, Delete, Edit, Update } = require('../controller/movieController');

const routes = express.Router();

// file upload 
const multer = require('multer');
const st = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'uploads')
    },
    filename : (req,file,cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
})
const fileUpload = multer({storage : st}).single('image');




routes.get('/',View);
routes.get('/add',Add);

routes.post('/insertMovie',fileUpload,insert);
routes.get('/deleteMovie',Delete)
routes.get('/editMovie',Edit)
routes.post('/UpdateMovie',fileUpload,Update)



module.exports = routes

