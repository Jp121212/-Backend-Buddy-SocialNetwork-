const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();



//POST FACULTAD
router.post('/follows', async (req, res) => {
    const result = await prisma.follows.create({
      // req.body es la info que manda el usuario para crear
      data: req.body
    });
    res.json(result);
  })

//GET TODO DE CADA FACULTAD
router.get('/follows', async (req, res) => {
    const userss = await prisma.follows.findMany({
        select:{
            follower: {
              select:{
                id : true,
                email: true,
              }
            },
            following: {
              select:{
                id : true,
                email: true,
              }
            }
          }
    });
    res.json(userss);
  })

  
 
  router.get('/follows/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.follows.findMany({
      where: { id: Number(id)},
      select:{
        id: true,
        username: true,
        imagen: true,
        email: true,
        password: true,
        followers: {
          select:{
            follower : {
              select:{
                id : true,
                email: true,
                username: true,
              }
            }
          }
        },
        following: {
          select:{
            following : {
              select:{
                imagen: true,
                id : true,
                email: true,
                username: true,
                post: true,
              }
            }
          }
        },
        post: {
          select:{
                id : true,
                content: true,
                createdAt: true,
                likes: true,
                comments: true,
              }
            },comments: {
              select:{
                id : true,
                content: true,
                createdAt: true,
              }
            }
          
        

      }
    });
    res.json(user);
  })


  module.exports = router;