import { GraphQLError } from "graphql";
import Employee from "../models/Employee.js";

const employeeResolvers = {
    Query: {
        getEmployees: async () => {
        return await Employee.find({});
    },

    searchEmployeeById: async (_, { eid }) => {
        const emp = await Employee.findById(eid);
        if (!emp) throw new GraphQLError("Employee not found", { extensions: { code: 'NOT_FOUND' } });
        return emp;
    },

    searchEmployeeByFilter: async (_, { designation, department }) => {
        const filter = {};
        if (designation) filter.designation = designation;
        if (department) filter.department = department;

        return await Employee.find(filter);
    }
  }
};

export default employeeResolvers;