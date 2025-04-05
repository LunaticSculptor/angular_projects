import { Component, inject, signal } from '@angular/core';
import { AppointmentService } from '../../services/appointment-service/appointment-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-interface',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-interface.component.html',
  styleUrl: './admin-interface.component.css'
})
export class AdminInterfaceComponent {
  private appointmentService = inject(AppointmentService);

  appointments = signal<any[]>([]);
  editingAppointment = signal<any | null>(null);

  ngOnInit() {
    this.fetchAllAppointments();
  }

  fetchAllAppointments() {
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.appointments.set(appointments);
    });
  }

  editAppointment(appointment: any) {
    this.editingAppointment.set({ ...appointment }); // Create a copy for editing
  }

  saveChanges() {
    if (!this.editingAppointment()) return;
    
    this.appointmentService.updateAppointment(this.editingAppointment()?.id, this.editingAppointment()).subscribe(() => {
      this.fetchAllAppointments(); // Refresh list
      this.editingAppointment.set(null); // Close edit mode
    });
  }

  cancelEdit() {
    this.editingAppointment.set(null);
  }

  deleteAppointment(id: number) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe(() => {
        this.fetchAllAppointments();
      });
    }
  }
}
