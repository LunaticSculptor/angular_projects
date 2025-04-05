import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = "http://localhost:3000/tasks";

  constructor(private httpClient: HttpClient) {}

  public getTasks(): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(this.url);
  }
}
