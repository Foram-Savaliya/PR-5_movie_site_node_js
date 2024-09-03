const express = require('express')
const MovieModule = require('../model/MovieModel');
const fs = require('fs');

const path = require('path')

const ViewMovie = async(req,res) =>{
    try {
        const movies = await MovieModule.find();
         return res.render('viewMovie',{
            movies
         })
        
    } catch (error) {
        console.log(error);
        return false;
        
    }
   
}

const AddMovie =(req,res) =>{
   return res.render('addMovie')
}
const insertMovie = async(req,res) =>{
    try {
        const{name,description,price} = req.body;
        // console.log(req.file);
        // console.log(req.body);
        await MovieModule.create({
            name:name,
            description:description,
            price:price,
            image :req.file.path
        })
        console.log("Added..");
        return res.redirect('/')

      } catch (error) {
        console.log(error);
        return false;
    }
}

const deleteMovie = async(req,res) =>{
    try {
        const deid = req.query.deletId;
        let single = await MovieModule.findById(deid);
        fs.unlinkSync(single.image);
        // console.log(deid);
        await MovieModule.findByIdAndDelete(deid)
        console.log("Deleted..");
        return res.redirect('/')
    } catch (error) {
        console.log(error);
        return false;
        
    }
}
const editMovie = async(req,res) =>{
    try {
        const eid = req.query.editId
        // console.log(eid);
        const single = await MovieModule.findById(eid)
        return res.render('editMovie',{
            single
        }
    )       
    } catch (error) {
        console.log(error);
        return false
    }
}
const UpdateMovie = async(req,res) =>{
    try {
        const{name,description,price,editid} = req.body;
        // console.log(req.body);
        if(req.file){
            const single = await MovieModule.findById(editid);
            fs.unlinkSync(single.image);
            await MovieModule.findByIdAndUpdate(editid,{
                        name:name,
                        description:description,
                        price:price,
                        image:req.file.path

                    })
                    console.log("Updated..");
                        return res.redirect('/')
        }else{
            const single = await MovieModule.findById(editid);
            fs.unlinkSync(single.image);
            await MovieModule.findByIdAndUpdate(editid,{
                        name:name,
                        description:description,
                        price:price,
                        image:single.image

                    })
                    console.log("Updated..");
                        return res.redirect('/')
        }
        
    } catch (error) {
        console.log(error);
        return false;
        
    }
}
module.exports ={
    ViewMovie,AddMovie,insertMovie,deleteMovie,editMovie,UpdateMovie
}