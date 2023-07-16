import { Request, Response } from 'express';
import Employee from '../models/Employee';
import logger from '../logger/logger';


export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, title, department, annualSalary } = req.body;
    const employee = new Employee({
      name,
      title,
      department,
      annualSalary,
    });
    await employee.save();
    
    // Log employee creation
    logger.info(`Employee created: ${employee._id}`);
    
    res.status(201).json(employee);
  } catch (error) {
    logger.error('Error creating employee:', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
};


// Get all employees
export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await Employee.find({ isDeleted: false });
    res.json(employees);
  } catch (error) {
    console.error('Error getting employees:', error);
    res.status(500).json({ error: 'Failed to get employees' });
  }
};

// Update an employee
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { department, title, annualSalary } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { department, title, annualSalary },
      { new: true }
    );
    if (!updatedEmployee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    
    // Log employee update
    logger.info(`Employee updated: ${updatedEmployee._id}`);
    
    res.json(updatedEmployee);
  } catch (error) {
    logger.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

// Delete an employee
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedEmployee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    
    // Log employee deletion
    logger.info(`Employee deleted: ${deletedEmployee._id}`);
    
    res.json(deletedEmployee);
  } catch (error) {
    logger.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};
