import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/appointments'; // JSON Server URL

  constructor(private http: HttpClient) {}

  // Add a new appointment
  bookAppointment(appointment: any): Observable<any> {
    return this.http.post(this.apiUrl, appointment);
  }

  // Get all appointments
  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get appointments for a specific patient (by user ID)
  getPatientAppointments(userId: string): Observable<any[]> {
    console.log('From service', userId, typeof userId, `${this.apiUrl}?userId=${userId}`);
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Get appointment by ID
  getAppointmentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update an appointment (for admin)
  updateAppointment(id: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedData);
  }

  // Delete an appointment (for admin)
  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id.toString()}`);
  }
}
