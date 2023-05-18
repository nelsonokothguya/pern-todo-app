import { Router, Request, Response } from 'express';
import prisma from '../prismaClient';
import { NotFoundError } from '../middlewares/customErrors';


const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const newTodo = await prisma.todo.create({
      data: req.body,
    });
    res.status(201).json(newTodo);
});

router.get('/', async (_req: Request, res: Response) => { 
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
});

router.put('/:id', async (req: Request, res: Response) => {
    const todo = await prisma.todo.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.status(200).json(todo);
});

// DELETE route for deleting a todo
router.delete('/:id', async (req: Request, res: Response) => {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!todo) {
      throw new NotFoundError('Todo not found');
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

