import * as request from 'supertest';
import { app } from '../src/index';
import prisma from '../src/prismaClient';

describe('Deleted Todo Routes', () => {
  let deletedTodo;

  beforeEach(async () => {
    // Run before each test, ensure the database is in a known state.
    await prisma.deletedTodo.deleteMany(); // Delete all deleted todos.
  });

  afterAll(async () => {
    // Clean up the test database
    await prisma.$disconnect();
  });

  // Test POST route for creating a new deleted todo
  it('should create a new deleted todo', async () => {
    const res = await request(app)
      .post('/deleted')
      .send({ originalId: 1, title: 'Test Deleted Todo', completed: true });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('originalId');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('completed');
    deletedTodo = res.body;
  });

  // Test GET route for getting all deleted todos
  it('should get all deleted todos', async () => {
    const res = await request(app).get('/deleted');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(1);
  });

  // Test PUT route for undeleting a todo
  it('should undelete a deleted todo', async () => {
    const res = await request(app)
      .put(`/deleted/undelete/${deletedTodo.id}`)
      .send({ title: 'Undeleted Test Todo', completed: false });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('completed');
  });

  // Test DELETE route for deleting a deleted todo permanently
  it('should delete a deleted todo permanently', async () => {
    const res = await request(app).delete(`/deleted/${deletedTodo.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});

