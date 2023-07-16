import request from 'supertest';
import app from '../src/index';

describe('Employee API tests', () => {
  test('should create an employee', async () => {
    const response = await request(app)
      .post('/employees')
      .send({
        name: 'John Doe',
        title: 'Software Engineer',
        department: 'Tech',
        annualSalary: 100000,
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
  });

  test('should update an employee', async () => {
    // Create an employee to update
    const createResponse = await request(app)
      .post('/employees')
      .send({
        name: 'Jane Smith',
        title: 'HR Manager',
        department: 'HR',
        annualSalary: 80000,
      });

    const updatedTitle = 'HR Director';

    const updateResponse = await request(app)
      .put(`/employees/${createResponse.body._id}`)
      .send({ title: updatedTitle });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toBe(updatedTitle);
  });

  test('should delete an employee', async () => {
    // Create an employee to delete
    const createResponse = await request(app)
      .post('/employees')
      .send({
        name: 'Sarah Johnson',
        title: 'Product Manager',
        department: 'Product',
        annualSalary: 90000,
      });

    const deleteResponse = await request(app).delete(`/employees/${createResponse.body._id}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.isDeleted).toBe(true);
  });
});
