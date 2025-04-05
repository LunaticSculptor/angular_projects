import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();

  newTask: Task = {
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Not Started'
  };

  addTask(): void {
    this.taskAdded.emit(this.newTask);
    this.newTask = { title: '', description: '', priority: 'Medium', status: 'Not Started' };
  }
}
