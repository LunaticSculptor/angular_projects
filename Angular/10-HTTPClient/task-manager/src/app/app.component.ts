import { Component, ViewChild } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager';

  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  constructor(private taskService: TaskService) {}

  addTask(newTask: Task): void {
    this.taskService.addTask(newTask).subscribe(() => {
      this.taskListComponent.loadTasks(); // Refresh task list after adding
    });
  }
}
