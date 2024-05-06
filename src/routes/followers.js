const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();
router.use(cors());
// POST para seguir a un usuario
router.post('/follows', async (req, res) => {
  try {
      // Obtén el ID del seguidor y del usuario seguido del cuerpo de la solicitud
      const { followerId, followingId } = req.body;

      // Verifica si ya existe un registro de seguimiento con los mismos IDs
      const existingFollow = await prisma.follows.findUnique({
          where: {
              followerId_followingId: {
                  followerId,
                  followingId
              }
          }
      });

      // Si ya existe un registro, devuelve un mensaje de error
      if (existingFollow) {
          return res.status(400).json({
              message: 'No se puede seguir al mismo usuario más de una vez.'
          });
      }

      // Crea un nuevo registro de seguimiento
      const result = await prisma.follows.create({
          data: {
              followerId,
              followingId
          }
      });

      // Devuelve el resultado del seguimiento creado
      res.json(result);
  } catch (error) {
      // Maneja cualquier error
      console.error('Error al seguir al usuario:', error);
      res.status(500).json({
          message: 'Ha ocurrido un error al seguir al usuario. Por favor, inténtalo de nuevo más tarde.'
      });
  }
});

//GET TODO DE CADA FACULTAD
router.get('/follows', async (req, res) => {
    const userss = await prisma.follows.findMany({
        select:{
            follower: {
              select:{
                id : true,
                email: true,
                username: true,
                imagen: true,
                
              }
            },
            following: {
              select:{
                id : true,
                email: true,
                username: true,
                imagen: true,

              }
            }
          }
    });
    res.json(userss);
  })

  //GET TODO DE CADA FACULTAD
router.delete('/follow/:id', async (req, res) => {
 
  try{ const userss = await prisma.follows.delete({
    where: { following : { id: req.body.following } }
  });
   if (userss) {
    res.json({
      message: 'Se ha eliminado correctamente'
    }); 
    res.json(userss); 
  }else{
    res.json({
      message: 'No se ha eliminado correctamente'
    });}
  }catch(error){
    res.json({error: error});
  }
  })
 
  router.get('/follows/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.follows.findMany({
        where: {
          followerId: parseInt(id) // Cambiado de 'id' a 'followerId'
        },
        select: {
          follower: {
            select: {
              email: true,
              username: true
            }
          },
          following: {
            select: {
              email: true,
              username: true,
              imagen: true, // Agregado
              post: true, // Agregado
              comments: true // Agregado
            }
          }
        }
      });
      res.json(user);
    } catch (error) {
      console.error('Error al obtener seguimientos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  




  module.exports = router;