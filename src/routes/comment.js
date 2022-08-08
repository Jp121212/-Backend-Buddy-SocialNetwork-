const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();




router.post('/comments', async (req, res) => {
    const result = await prisma.comment.create({
      // req.body es la info que manda el usuario para crear
      data: req.body
    });
    res.json(result);
  })

  router.get('/comments', async (req, res) => {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  })
  
 



  module.exports = router;