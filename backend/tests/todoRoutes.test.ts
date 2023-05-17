import * as request from 'supertest';
import { app } from '../src/index';
import prisma from '../src/prismaClient';

describe('Todo Routes', () => {
  let createdTodo;

  // Test POST route for creating a new todo
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: 'Test Todo' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('completed');
    createdTodo = res.body;
  });

  // Test GET route for getting all todos
  it('should get all todos', async () => {
    const res = await request(app).get('/todos');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(1);
  });

  // Test PUT route for updating a todo
  it('should update a todo', async () => {
    const res = await request(app)
      .put(`/todos/${createdTodo.id}`)
      .send({ title: 'Updated Test Todo' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Updated Test Todo');
    expect(res.body).toHaveProperty('completed');
  });

  // Test DELETE route for deleting a todo
  it('should delete a todo', async () => {
    const res = await request(app).delete(`/todos/${createdTodo.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Todo deleted successfully');
  });

  afterAll(async () => {
    // Clean up the test database
    await prisma.$disconnect();
  });
});

