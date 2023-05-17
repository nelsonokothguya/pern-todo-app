import { Router, Request, Response } from 'express';
import prisma from "../prismaClient"

const router = Router();

// Create a new deleted todo
router.post('/deletedtodos', async (req: Request, res: Response) => {
    const { originalId, title, completed } = req.body;
    const deletedTodo = await prisma.deletedTodo.create({
        data: {
            originalId: originalId,
            title: title,
            completed: completed || true
        },
    });
    res.json(deletedTodo);
});

// Retrieve all deleted todos
router.get('/deletedtodos', async (req: Request, res: Response) => {
    const deletedTodos = await prisma.deletedTodo.findMany();
    res.json(deletedTodos);
});

// Undelete a todo
router.put('/deletedtodos/undelete/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    // find the deletedTodo first
    const deletedTodo = await prisma.deletedTodo.findUnique({
        where: { id: Number(id) },
    });

    if (!deletedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    // Move the deletedTodo back to todo
    const todo = await prisma.todo.create({
        data: {
            title: deletedTodo.title,
            completed: deletedTodo.completed
        }
    });

    // Delete the deletedTodo
    await prisma.deletedTodo.delete({
        where: { id: Number(id) },
    });

    res.json(todo);
});

// Delete a deleted todo permanently
router.delete('/deletedtodos/:id', async (req: Request, res: Response) => {
    await prisma.deletedTodo.delete({
        where: { id: Number(req.params.id) },
    });

    res.json({ message: 'Deleted todo deleted successfully' });
});

export default router;

