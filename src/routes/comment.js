import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
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


export default router;