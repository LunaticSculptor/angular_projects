import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor() {}

  // Fetch all employees
  async getEmployees(): Promise<EmployeeModel[]> {
    try {
      const response = await fetch(this.apiUrl);
      return await response.json();
    } catch (error) {
      console.error('Error fetching employees:', error);
      return [];
    }
  }

  // Add a new employee
  async addEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding employee:', error);
      return {} as EmployeeModel;
    }
  }

  // Delete an employee
  async deleteEmployee(id: number): Promise<void> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to delete employee with ID ${id}, Status: ${response.status}`);
      }
      console.log(`Employee with ID ${id} deleted`);
    })
    .catch(error => console.error('Error deleting employee:', error));
  }
    
}
