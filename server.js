import dotenv from 'dotenv';
import connectDB from './config/db.js'

import {ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

dotenv.config();

import employeeResolvers from './resolvers/EmployeeResolver.js'
import userResolvers from './resolvers/UserResolver.js'
import {typeDefs} from './schemas/typeDefs.js';


// Connect to MongoDB
connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query:{
            ...userResolvers.Query,
            ...employeeResolvers.Query,
        },
        Mutation:{
            ...userResolvers.Mutation,
            ...employeeResolvers.Mutation,
        }
    }
});


// Start server
const { url } = await startStandaloneServer(server, {
    listen: {
        port: process.env.PORT || 4000
    },
});

console.log("Server running at: ", url)
