import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../../service/task/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'ngx-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})

export class TaskManagementComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task = {
    title: '',
    description: '',
    startedAt: '',
    endedAt: '',
    state: 'IN_PROGRESS',
    priority: 'MEDIUM',
    collaborators: [] // Initialize collaborators array
  };

  @Output() taskSelected = new EventEmitter<string>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks(); // Load tasks when component initializes
  }

  onSubmit() {
    if (this.selectedTask.id) {
      this.updateTask(this.selectedTask);
    } else {
      this.createTask(this.selectedTask);
    }
  }

  createTask(task: Task) {
    this.taskService.createTask(task).subscribe((newTask) => {
      this.tasks.push(newTask);
      this.clearSelection();
    });
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task.id!, task).subscribe(() => {
      const index = this.tasks.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
      }
      this.clearSelection();
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  selectTask(task: Task) {
    this.selectedTask = { ...task };
    this.taskSelected.emit(task.id!); // Emit the selected task ID
  }

  clearSelection() {
    this.selectedTask = {
      title: '',
      description: '',
      startedAt: '',
      endedAt: '',
      state: 'IN_PROGRESS',
      priority: 'MEDIUM',
      collaborators: [] // Clear collaborators
    };
  }

  addCollaborator() {
    this.selectedTask.collaborators = this.selectedTask.collaborators || [];
    this.selectedTask.collaborators.push({ name: '', email: '' });
  }

  removeCollaborator(index: number) {
    this.selectedTask.collaborators?.splice(index, 1);
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }
}
