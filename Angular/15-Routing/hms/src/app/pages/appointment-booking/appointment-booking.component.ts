import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../services/appointment-service/appointment-service.service';
import { LoginServiceService } from '../../services/login-service/login-service.service';

@Component({
  selector: 'app-appointment-booking',
  imports: [ReactiveFormsModule],
  templateUrl: './appointment-booking.component.html',
  styleUrl: './appointment-booking.component.css'
})
export class AppointmentBookingComponent {

  userId: string | null = '';
  private appointmentService = inject(AppointmentService);
  private formBuilder = inject(FormBuilder);
  private auth = inject(LoginServiceService);

  appointmentForm = signal<FormGroup | null>(null);

  constructor(private route: ActivatedRoute) {
    this.initForm();
  }

  ngOnInit() {
    // this.userId = this.route.snapshot.paramMap.get('id');
    this.userId = this.auth.getCurrentUser()!.id.toString();
    console.log('userId', this.userId);
  }

  initForm() {
    const form = this.formBuilder.group({
      patientInfo: this.formBuilder.group({
        date: ['', [Validators.required, this.validateDate.bind(this)]],
        serviceType: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        patientDetails: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        specialRequests: ['', [Validators.required]]
      }),
    });
    this.appointmentForm.set(form);
  }

  validateDate(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate < today ? { pastDate: true } : null;
  }

  formatAppointmentData() {
    if (!this.appointmentForm()?.valid) return null;

    const formData = this.appointmentForm()?.value.patientInfo;
    return {
      userId: this.userId || 'guest',
      date: formData.date,
      serviceType: formData.serviceType,
      patientDetails: formData.patientDetails,
      specialRequests: formData.specialRequests
    };
  }

  onSubmit() {
    if (this.appointmentForm()?.invalid) {
      this.appointmentForm()?.markAllAsTouched();
      return;
    }

    const appointmentData = this.formatAppointmentData();
    if (!appointmentData) return;

    this.appointmentService.bookAppointment(appointmentData).subscribe({
      next: (response) => {
        console.log('Appointment booked successfully:', response);
        this.appointmentForm()?.reset();
      },
      error: (error) => {
        console.error('Error booking appointment:', error);
      }
    });
  }
}
