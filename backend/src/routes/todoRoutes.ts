import { Router, Request, Response, response } from 'express';
import prisma from '../prismaClient';
import { NotFoundError } from '../middlewares/customErrors';
import { postOneToDeletedTodos } from '../middlewares/posting';

const router = Router();

router.post('/', async ({ body }: Request, res: Response) => {
  try {
    if (!body.title) {
      throw new Error('Title cannot be empty');
    }
    const newTodo = await prisma.todo.create({
      data: body,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//ALL
router.get('/', async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//SINGLE
router.get('/:id', async ({params}: Request, res: Response) => {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(params.id) },
    });
    res.status(200).json(todo);
});


//PUT
router.put('/:id', async ({params, body}: Request, res: Response) => {
    const todo = await prisma.todo.update({
      where: { id: Number(params.id) },
      data: body,
    });
    res.status(200).json(todo);
});

//PATCH
router.patch('/:id', async ({params, body}: Request, res: Response) => {
    const todo = await prisma.todo.update({
      where: { id: Number(params.id) },
      data: body,
    });
    res.status(200).json(todo);
}
);
//DELETE
router.delete('/:id', async ({params}: Request, res: Response) => {
  console.log("params", params);
    const todo = await prisma.todo.findUnique({
      where: { id: Number(params.id) },
    });
    console.log("todo", todo)
    if (!todo) {
      throw new NotFoundError('Todo not found');
    }

const dataPostedToDeletedTodos = await postOneToDeletedTodos(todo.title)


console.log("dataPostedToDeletedTodos", dataPostedToDeletedTodos)



   await prisma.todo.delete({
      where: { id: Number(params.id) },
    });
    res.status(200).json(dataPostedToDeletedTodos);
    
});

export default router;

      