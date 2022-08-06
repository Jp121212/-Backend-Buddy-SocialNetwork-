import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();


//CRUD FACULTAD

//POST FACULTAD
router.post('/users', async (req, res) => {
    const result = await prisma.user.create({
      // req.body es la info que manda el usuario para crear
      data: req.body
    });
    res.json(result);
  })

 router.put('/user/:id', async (req, res) => {
    
    try {
      const { id } = req.params;
      const updateuser = await prisma.user.update({
        where: { id: Number(id)},
        data:{
            imagen: req.body.imagen,
        }
      });
      res.json(updateuser);
    } catch(e) {
      res.json({error: `User con la id: ${id} no existe`})
    }
  })
//GET TODO DE CADA FACULTAD
router.get('/users', async (req, res) => {
    const userss = await prisma.user.findMany({
      select:{
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
                id : true,
                email: true,
                username: true,
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
    res.json(userss);
  })

  

export default router;