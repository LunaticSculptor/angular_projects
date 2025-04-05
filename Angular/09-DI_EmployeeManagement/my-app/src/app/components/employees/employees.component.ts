import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeModel } from '../../models/employee.model';

@Component({
  selector: 'app-employees',
  imports: [FormsModule, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  private employeeService = inject(EmployeeService);
  employees: EmployeeModel[] = [];
  newEmployee: EmployeeModel = { id: 0, name: '', department: '' };

  constructor() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().then(data => {
      this.employees = data;
    });
  }

  addEmployee() {
    if (!this.newEmployee.name || !this.newEmployee.department) {
      alert('Name and department are required!');
      return;
    }

    this.newEmployee.id = this.employees.length ? Math.max(...this.employees.map(e => e.id)) + 1 : 1;
    this.employeeService.addEmployee(this.newEmployee).then(() => {
      this.loadEmployees(); // Reload employees after adding
      this.newEmployee = { id: 0, name: '', department: '' }; // Reset input fields
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).then(() => {
      this.loadEmployees(); // Reload employees after deletion
    });
  }
}
