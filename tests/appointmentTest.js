import request from 'supertest';
import app from '../app.js'; // Assuming app.js is the entry point
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import connectDB from '../config/db.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Doctor Appointment System', () => {
  it('should book an appointment successfully', async () => {
    const response = await request(app)
      .post('/api/appointments')
      .send({
        firstName: 'Aqsa',
        lastName: 'Doe',
        email: 'john@example.com',
        timeSlot: '10:00 AM - 11:00 AM',
        doctorName: 'Dr. Smith',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Appointment booked');
  });

  // Add additional tests for other APIs (view, modify, cancel)
});
