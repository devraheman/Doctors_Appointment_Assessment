import AppointmentModel from '../models/appointmentModel.js';

const doctors = ['Arbaz Khan','Amardeep Patil', 'Sofiya Khan', 'Farhan Khan', 'Ashutosh Mehta','Mayur Gajare'];

export const bookAppointment = async (req, res) => {
  const { firstName, lastName, email, timeSlot, doctorName } = req.body;
  console.log(email);

  if (!firstName || !lastName || !email || !timeSlot || !doctorName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (!doctors.includes(doctorName)) {
    return res.status(400).json({ message: 'Doctor not found' });
  }

  const existingAppointment = await AppointmentModel.findOne({ doctorName, timeSlot });
  if (existingAppointment) {
    return res.status(400).json({ message: 'Time slot is already booked' });
  }
   
  const appointment = new AppointmentModel({ firstName, lastName, email, timeSlot, doctorName });
  try {
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

  

















export const getAppointmentDetails = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const appointment = await AppointmentModel.findOne({ email });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getAppointmentsByDoctor = async (req, res) => {
  const { doctorName } = req.query;
  console.log(doctorName);

  if (!doctorName || !doctors.includes(doctorName)) {
    return res.status(400).json({ message: 'Invalid doctor name' });
  }

  try {
    const doctorAppointments = await AppointmentModel.find({ doctorName });
    res.status(200).json(doctorAppointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const cancelAppointment = async (req, res) => {
  const { email, timeSlot } = req.body;

  try {
    const appointment = await AppointmentModel.findOneAndDelete({ email, timeSlot });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const modifyAppointment = async (req, res) => {
  const { email, originalTimeSlot, newTimeSlot } = req.body;

  try {
    const appointment = await AppointmentModel.findOne({ email, timeSlot: originalTimeSlot });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const existingAppointment = await AppointmentModel.findOne({ doctorName: appointment.doctorName, timeSlot: newTimeSlot });
    if (existingAppointment) {
      return res.status(400).json({ message: 'New time slot is already booked' });
    }

    appointment.timeSlot = newTimeSlot;
    await appointment.save();
    res.status(200).json({ message: 'Appointment updated', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
 















































































// import Appointment from '../models/appointmentModel.js';

// const doctors = ['Arbaz Khan','Amardeep Patil', 'Sofiya Khan', 'Farhan Khan', 'Ashutosh Mehta','Mayur Gajare']; // Predefined doctors

// // POST /appointments - Book an appointment
// export const bookAppointment = async (req, res) => {
//   const { firstName, lastName, email, timeSlot, doctorName } = req.body;
//   console.log( firstName, lastName, email, timeSlot, doctorName );
  

//   // Validate inputs
//   if (!firstName || !lastName || !email || !timeSlot || !doctorName) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   if (!doctors.includes(doctorName)) {
//     return res.status(400).json({ message: 'Doctor not found' });
//   }

//   // Check if the time slot is already booked for the doctor
//   const existingAppointment = await Appointment.findOne({ doctorName, timeSlot });
//   if (existingAppointment) {
//     return res.status(400).json({ message: 'Time slot is already booked' });
//   }

//   // Create and save the appointment
//   const appointment = new Appointment({ firstName, lastName, email, timeSlot, doctorName });
//   try {
//     await appointment.save();
//     res.status(201).json({ message: 'Appointment booked', appointment });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };





// // GET /appointments - View appointment details
// export const getAppointmentDetails = async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const appointment = await Appointment.findOne({ email });
//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }

//     res.status(200).json(appointment);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };




// // GET /appointments/doctor - View all appointments by doctor
// export const getAppointmentsByDoctor = async (req, res) => {
//   const { doctorName } = req.query;
//   console.log(doctorName);
  

//   if (!doctorName || !doctors.includes(doctorName)) {
//     return res.status(400).json({ message: 'Invalid doctor name' });
//   }

//   try {
//     const doctorAppointments = await Appointment.find({ doctorName });
//     res.status(200).json(doctorAppointments);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };


// // DELETE /appointments - Cancel appointment
// export const cancelAppointment = async (req, res) => {
//   const { email, timeSlot } = req.body;

//   try {
//     const appointment = await Appointment.findOneAndDelete({ email, timeSlot });
//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }

//     res.status(200).json({ message: 'Appointment cancelled' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // PUT /appointments - Modify appointment time slot
// export const modifyAppointment = async (req, res) => {
//   const { email, originalTimeSlot, newTimeSlot } = req.body;

//   try {
//     const appointment = await Appointment.findOne({ email, timeSlot: originalTimeSlot });
//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }

//     // Check if new time slot is available
//     const existingAppointment = await Appointment.findOne({ doctorName: appointment.doctorName, timeSlot: newTimeSlot });
//     if (existingAppointment) {
//       return res.status(400).json({ message: 'New time slot is already booked' });
//     }

//     appointment.timeSlot = newTimeSlot;
//     await appointment.save();
//     res.status(200).json({ message: 'Appointment updated', appointment });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };
