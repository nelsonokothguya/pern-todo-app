import request from 'supertest';
import app from "../src/index";

describe('Test todo routes', () => {

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/')
      .send({ title: 'Test Todo', completed: false });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual('Test Todo');
    expect(res.body.completed).toBe(false);
  });

  it('should fetch all todos', async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should update a todo', async () => {
    const idToUpdate = 1; // replace with an actual id to test with
    const res = await request(app)
      .put(`/${idToUpdate}`)
      .send({ title: 'Updated Todo', completed: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Updated Todo');
    expect(res.body.completed).toBe(true);
  });

  it('should delete a todo', async () => {
    const idToDelete = 1; // replace with an actual id to test with
    const res = await request(app)
      .delete(`/${idToDelete}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Todo deleted successfully');
  });

});

