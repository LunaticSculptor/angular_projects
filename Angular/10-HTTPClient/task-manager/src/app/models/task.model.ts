export interface Task {
    id?: number;
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Not Started' | 'In Progress' | 'Completed';
  }
  