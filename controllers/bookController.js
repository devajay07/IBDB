const express = require('express');
const bookModel = require("../models/bookModel");
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');



exports.createBook = catchAsync(async (req,res,next)=>{
    const data = await bookModel.create(req.body);

    res.status(200).send({
        status:"success",
        data:data
    })
   });

exports.getBooks = catchAsync(async (req,res,next) =>{
        
        const excluded = ["limit","fields","sort","page",""]; // excluding these from queries searching
        let queryObj = {...req.query}; // so the original data can persists
      
        excluded.forEach(el=>delete queryObj[el]); // deleting all query features

        
        let query = bookModel.find(queryObj); // finding data based on query if any.
       
        // sorting
        if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else{
            query = query.sort("avgrating");
        }

        // fields
        if(req.query.fields){
            const selectBy = req.query.fields.split(',').join(' ');
            query = query.select(selectBy);
        }else{
            query = query.select("-_v");
        }
       
        // pagination
        const page = req.query.page || 1;
        const limit = req.query.limit || 100;
        const skipBy = (page-1)*limit;
        query = query.skip(skipBy).limit(limit);
        
        // getting result
        const data = await query;

        res.status(200).send({
            status:"success",
            length:data.length,
            data:data
        })
    });

exports.getAbook = catchAsync( async (req,res,next) =>{
 
        const Id = req.params.id;
        const data = await bookModel.findById(Id);

        if(!data){
            return next(new appError('No book exist with that id', 404))
        }

        res.status(200).send({
            status:"success",
            data:data
        })
  
});

exports.updateBook = catchAsync(async (req,res,next) =>{

        const Id = req.params.id;
        const toUpdate = req.body;
        console.log(toUpdate);
        const data = await bookModel.updateOne({ _id: Id }, { $set: toUpdate });

        if(!data){
            return next(new appError('No book exist with that id', 404))
        }

        res.status(200).send({
            status:"success",
            data:data
        })
    });

exports.deleteBook = catchAsync(async (req,res,next) =>{

        const Id = req.params.id;
        const data = await bookModel.deleteMany({_id:Id});

        if(!data){
            return next(new appError('No book exist with that id', 404))
        }

        res.status(200).send({
            status:"success",
            data:data
        })
});