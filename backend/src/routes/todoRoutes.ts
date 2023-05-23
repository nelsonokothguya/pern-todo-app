import { Router, Request, Response } from 'express';
import prisma from '../prismaClient';
import { NotFoundError } from '../middlewares/customErrors';

const router = Router();

router.post('/', async ({body}: Request, res: Response) => {
    const newTodo = await prisma.todo.create({
      data: body,
    });
    res.status(201).json(newTodo);
});

router.get('/', async (_: Request, res: Response) => { 
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
});

router.put('/:id', async ({params, body}: Request, res: Response) => {
    const todo = await prisma.todo.update({
      where: { id: Number(params.id) },
      data: body,
    });
    res.status(200).json(todo);
});

// DELETE route for deleting a todo
router.delete('/:id', async ({params}: Request, res: Response) => {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(params.id) },
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
      where: { id: Number(params.id) },
    });

    res.status(200).json({ message: 'Todo deleted successfully' }); 
});

export default router;

