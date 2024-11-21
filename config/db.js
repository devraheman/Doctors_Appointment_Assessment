import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo DB connected Successfully');
  } catch (err) {
    console.error('Mongo DB connection error:', err);
  }
};

export default connectDB;
