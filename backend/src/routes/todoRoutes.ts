import { Router, Request, Response } from 'express';
import prisma from '../prismaClient';

const router = Router();

router.post('/todos', async (req: Request, res: Response) => {
 
    const newTodo = await prisma.todo.create({
      data: req.body,
    });
    res.status(201).json(newTodo);
  });

router.get('/todos', async (_req: Request, res: Response) => { 
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
});


router.put('/todos/:id', async (req: Request, res: Response) => {
    const todo = await prisma.todo.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(200).json(todo);
 
});

// DELETE route for deleting a todo
router.delete('/todos/:id', async (req: Request, res: Response) => {
  
    const todo = await prisma.todo.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await prisma.deletedTodo.create({
      data: {
        originalId: todo.id,
        title: todo.title,
        completed: todo.completed,
      },
    });

    await prisma.todo.delete({
      where: { id: Number(req.params.id) },
    });

    res.status(200).json({ message: 'Todo deleted successfully' }); 
});

export default router;

