import { GraphQLError } from "graphql";
import User from "../models/User.js";

const userResolvers = {
    Query: {
        login: async( _, {username, email, password}) =>{
            const user = await User.findOne({email});
            
            if(!user){
                throw new GraphQLError('Error: user not found');
            }


            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                throw new GraphQLError('Error: username or password is incorrect')
            }


            return user;
        }
  },

  Mutation: {
    signup: async (_, {username, email, passsword }) => {
        
        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{email}, {username} ]
        });

        // Handle cases where user already exists
        if(existingUser){
            throw new GraphQLError('Error: user already exists');
        }

        // Set up new user object.
        const newUser = new User({username, emaill, password});
        return await newUser.savE();
    }
  }
  
};

export default UserResolvers;