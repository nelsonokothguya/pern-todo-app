"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const customErrors_1 = require("../middlewares/customErrors");
const router = (0, express_1.Router)();
// Create a new deleted todo
router.post('/', async (req, res) => {
    const { originalId, title, completed = true } = req.body;
    const deletedTodo = await prismaClient_1.default.deletedTodo.create({
        data: { originalId, title, completed },
    });
    res.json(deletedTodo);
});
// Retrieve all deleted todos
router.get('/', async (_req, res) => {
    const deletedTodos = await prismaClient_1.default.deletedTodo.findMany();
    res.json(deletedTodos);
});
// Undelete a todo
router.put('/undelete/:id', async (req, res) => {
    const { id } = req.params;
    const deletedTodo = await prismaClient_1.default.deletedTodo.findUnique({
        where: { id: Number(id) },
    });
    if (!deletedTodo) {
        throw new customErrors_1.NotFoundError('Todo not found');
    }
    const todo = await prismaClient_1.default.todo.create({
        data: deletedTodo,
    });
    await prismaClient_1.default.deletedTodo.delete({
        where: { id: Number(id) },
    });
    res.json(todo);
});
// Delete a deleted todo permanently
router.delete('/:id', async (req, res) => {
    await prismaClient_1.default.deletedTodo.delete({
        where: { id: Number(req.params.id) },
    });
    res.json({ message: 'Deleted todo deleted successfully' });
});
exports.default = router;
//# sourceMappingURL=deletedTodoRoutes.js.map