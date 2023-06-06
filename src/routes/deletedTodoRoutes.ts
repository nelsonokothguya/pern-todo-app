import { Router, Request, Response } from 'express';
import prisma from '../prismaClient';
import { NotFoundError } from '../middlewares/customErrors';


const router = Router();

//ALL
router.get('/', async (_req: Request, res: Response) => {
  const deletedTodos = await prisma.deletedTodo.findMany();
  res.json(deletedTodos);
});

//SINGLE
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedTodo = await prisma.deletedTodo.findUnique({
    where: { id: Number(id) },
  });

  if (!deletedTodo) {
    throw new NotFoundError('Deleted todo not found');
  }

  res.json(deletedTodo);
})

//ADD ONE
router.post('/', async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const deletedTodo = await prisma.deletedTodo.create({
    data: {
      title,
      completed: true,
    },
  });

  res.status(201).json(deletedTodo);
})
//PUT
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed = true} = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const deletedTodo = await prisma.deletedTodo.update({
    where: { id: Number(id) },
    data: {
      title,
      completed
    },
  });

  res.json(deletedTodo)
});

//PATCH

router.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  const deletedTodo = await prisma.deletedTodo.update({
    where: { id: Number(id) },
    data: {
      title,
    },
  });
  res.json(deletedTodo);
});

//DELETE

router.delete('/:id', async (req: Request, res: Response) => {
  await prisma.deletedTodo.delete({
    where: { id: Number(req.params.id) },
  });

  res.json({ message: 'Deleted todo removed successfully' });
});

export default router;

