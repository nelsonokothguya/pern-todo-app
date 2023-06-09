"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const customErrors_1 = require("../middlewares/customErrors");
const router = (0, express_1.Router)();
router.post('/', async ({ body }, res) => {
    const newTodo = await prismaClient_1.default.todo.create({
        data: body,
    });
    res.status(201).json(newTodo);
});
router.get('/', async (_, res) => {
    const todos = await prismaClient_1.default.todo.findMany();
    res.status(200).json(todos);
});
router.put('/:id', async ({ params, body }, res) => {
    const todo = await prismaClient_1.default.todo.update({
        where: { id: Number(params.id) },
        data: body,
    });
    res.status(200).json(todo);
});
// DELETE route for deleting a todo
router.delete('/:id', async ({ params }, res) => {
    const todo = await prismaClient_1.default.todo.findUnique({
        where: { id: Number(params.id) },
    });
    if (!todo) {
        throw new customErrors_1.NotFoundError('Todo not found');
    }
    await prismaClient_1.default.deletedTodo.create({
        data: {
            originalId: todo.id,
            title: todo.title,
            completed: todo.completed,
        },
    });
    await prismaClient_1.default.todo.delete({
        where: { id: Number(params.id) },
    });
    res.status(200).json({ message: 'Todo deleted successfully' });
});
exports.default = router;
//# sourceMappingURL=todoRoutes.js.map