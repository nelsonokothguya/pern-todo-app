import { Router, Request, Response } from 'express';
import prisma from '../prismaClient';
import { NotFoundError } from '../middlewares/customErrors';


const router = Router();

// Create a new deleted todo
router.post('/', async (req: Request, res: Response) => {
  const { originalId, title, completed = true } = req.body;
  const deletedTodo = await prisma.deletedTodo.create({
    data: { originalId, title, completed },
  });
  res.json(deletedTodo);
});

// Retrieve all deleted todos
router.get('/', async (_req: Request, res: Response) => {
  const deletedTodos = await prisma.deletedTodo.findMany();
  res.json(deletedTodos);
});

// Undelete a todo
router.put('/undelete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTodo = await prisma.deletedTodo.findUnique({
    where: { id: Number(id) },
  });

  if (!deletedTodo) {
    throw new NotFoundError('Todo not found');
  }

  const todo = await prisma.todo.create({
    data: deletedTodo,
  });

  await prisma.deletedTodo.delete({
    where: { id: Number(id) },
  });

  res.json(todo);
});

// Delete a deleted todo permanently
router.delete('/:id', async (req: Request, res: Response) => {
  await prisma.deletedTodo.delete({
    where: { id: Number(req.params.id) },
  });

  res.json({ message: 'Deleted todo deleted successfully' });
});

export default router;

