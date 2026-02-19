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
  },

  Mutation: {
    addEmployee: async (_, args) => {
        const newEmp = new Employee(args);

        return await newEmp.save();
    },
    updateEmployeeById: async (_, { eid, ...updateData }) => {
        const updated = await Employee.findByIdAndUpdate(eid, updateData, { new: true });
        if (!updated) throw new GraphQLError("Update failed");

        return updated;
    },
    deleteEmployeeById: async (_, { eid }) => {
      const deleted = await Employee.findByIdAndDelete(eid);
      if (!deleted) throw new GraphQLError("Delete failed");

      return "Employee deleted successfully";
    }
  }
  
};

export default employeeResolvers;