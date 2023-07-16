import mongoose, { Document, Schema } from 'mongoose';

enum Department {
  HR = 'HR',
  Tech = 'Tech',
  Product = 'Product',
  Leadership = 'Leadership'
}

interface Employee extends Document {
  name: string;
  title: string;
  department: Department;
  annualSalary: number;
  isDeleted: boolean;
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  department: { type: String, enum: Object.values(Department), required: true },
  annualSalary: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model<Employee>('Employee', EmployeeSchema);
