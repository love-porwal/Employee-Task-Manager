import { Router } from 'express';
import { createEmployee, updateEmployee, deleteEmployee,getAllEmployees } from '../controllers/employeeController';

const router = Router();
router.get('/employees', getAllEmployees);
router.post('/employees', createEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

export default router;
