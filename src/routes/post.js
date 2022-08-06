import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();



router.post('/post', async (req, res) => {
    const result = await prisma.post.create({
     
      data: req.body
    });
    res.json(result);
  })


router.get('/post', async (req, res) => {
    const posts = await prisma.post.findMany({
        select:{
            id : true,
        }     
    });
    res.json(posts);
  })

  router.put('/postlike/:id', async (req, res) => {
    
    try {
      const { id } = req.params;
      const updatelike = await prisma.post.update({
        where: { id: Number(id)},
        data:{
            likes: {
                increment: 1,
            }
        }
      });
      res.json(updatelike);
    } catch(e) {
      res.json({error: `Likes con la id del post ${id} no existe`})
    }
  })

  router.put('/postdislike/:id', async (req, res) => {
    
    try {
      const { id } = req.params;
      const updatelike = await prisma.post.update({
        where: { id: Number(id)},
        data:{
            likes: {
                decrement: 1,
            }
        }
      });
      res.json(updatelike);
    } catch(e) {
      res.json({error: `DisLikes con la id del post ${id} no existe`})
    }
  })


   router.put('/postdislike/:id', async (req, res) => {
    
    try {
      const { id } = req.params;
      const updatelike = await prisma.post.update({
        where: { id: Number(id)},
        data:{
            likes: {
                decrement: 1,
            }
        }
      });
      res.json(updatelike);
    } catch(e) {
      res.json({error: `DisLikes con la id del post ${id} no existe`})
    }
  })
  
  router.delete(`/post/:id`, async (req, res) => {
    const { id } = req.params;
    try{
    const user = await prisma.post.delete({
      where: { id: Number(id)},
    });
    if(user){
      res.json({Completado: `User con el id ${id} borrado exitosamente` })
      res.json(user);
  
    }else{
      res.json({error: `User con el id ${id} no se puede borrar ya que no existe`})
    }
  }catch(e){
    res.json({error: `User con el id  ${id} no se puede borrar ya que no existe`})
  }})
  

export default router;