import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js'

dotenv.config();

connectDB();
