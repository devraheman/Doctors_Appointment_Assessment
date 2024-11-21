import express from 'express';
import * as appointmentController from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/appointments', appointmentController.bookAppointment);
router.get('/appointments', appointmentController.getAppointmentDetails);
router.get('/appointments/doctor', appointmentController.getAppointmentsByDoctor);
router.delete('/appointments', appointmentController.cancelAppointment);
router.put('/appointments', appointmentController.modifyAppointment);

export default router;
