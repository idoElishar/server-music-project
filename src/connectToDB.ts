import mongoose, { Document, Schema } from 'mongoose';
import { api } from './server';

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(api);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }


