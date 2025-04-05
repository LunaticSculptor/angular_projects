import { Component, inject, signal } from '@angular/core';
import { AppointmentService } from '../../services/appointment-service/appointment-service.service';
import { CommonModule } from '@angular/common';
import { LoginServiceService } from '../../services/login-service/login-service.service';

@Component({
  selector: 'app-appointment-history',
  imports: [CommonModule],
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.css'
})
export class AppointmentHistoryComponent {
  private appointmentService = inject(AppointmentService);
  private auth = inject(LoginServiceService);
  
  userId: string = "";
  appointments = signal<any[]>([]);
  pastAppointments = signal<any[]>([]);
  upcomingAppointments = signal<any[]>([]);

  ngOnInit() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.userId = this.auth.getCurrentUser()?.id?.toString() || 'guest';
    console.log('userId from component', this.userId);
    this.appointmentService.getPatientAppointments(this.userId).subscribe(appointments => {
      this.appointments.set(appointments);
      const now = new Date();
      this.pastAppointments.set(appointments.filter(appt => new Date(appt.date) < now));
      this.upcomingAppointments.set(appointments.filter(appt => new Date(appt.date) >= now));
    });
  }
}
