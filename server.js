import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js'

import {ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import employeeResolvers from './resolvers/EmployeeResolver.js'
import userResolvers from './resolvers/UserResolver.js'

dotenv.config();





connectDB();
