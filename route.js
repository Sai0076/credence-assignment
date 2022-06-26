const express =require('express')
const router = express.Router()
const Movie = require('./model/movies')

//Getting all movies
router.get('/',async (req,res)=>{
    try{
        const movies = await Movie.find()
        res.json(movies)
    }
    catch (err){
        res.json({message:err.message})
    }
})

//Getting one movie

router.get('/:id',getMovie,(req,res)=>{
    res.json(res.movie)
})

// posting movies

router.post('/',async (req,res)=>{
    const movie= new Movie({
        name:req.body.name,
        img : req.body.img,
        summary:req.body.summary

    })
    try{
        const newMovie = await movie.save()
        res.json(newMovie)
    } catch (err){
        res.json({message:err.message})
    }
    
})

// updating the movies

router.patch('/:id',getMovie,async (req,res)=>{
    if(req.body.name != null){
        res.movie.name= req.body.name
    }
    if(req.body.img != null){
        res.movie.img= req.body.img
    }
    if(req.body.summary != null){
        res.movie.summary= req.body.summary
    }
    try{
        const updatedMovie = await res.movie.save()
        res.json({message:'Updated movie'})
    } catch (err){
        res.json({message:err.message})
    }
})

//deleting the movies

router.delete('/:id',getMovie,async (req,res)=>{
    try{
        await res.movie.remove()
        res.json({message:"Deleted"})
    } catch (err){
        res.json({message:err.message})
    }
})

async function getMovie(req,res,next){
    let movie
    try{
        movie= await Movie.findById(req.params.id)
        if (movie == null){
            return res.json({message:'Cannot find thee movie'})
        }

    } catch (err){
        return res.json({message:err.message})
    }

    res.movie=movie
    next()
}

module.exports=router