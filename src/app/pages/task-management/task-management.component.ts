import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../../service/task/task.service';
import { Task } from '../../models/task.model';




import { UserStoryService } from '../../service/user-story/user-story.service';
import { UserStory } from '../../models/user-story.model';

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
    collaborators: [] 
  };
  isEditMode = false;



  @Output() taskSelected = new EventEmitter<string>();







  userStories: UserStory[] = [];
  filteredUserStories: UserStory[] = [];
  selectedUserStory: UserStory = { title: '', description: '', taskId: '' };
  newUserStory: UserStory = { title: '', description: '', taskId: '' };
  currentTaskId: string = '';
  isPopupVisible: boolean = false;


  currentStep: number = 1;



  constructor(private taskService: TaskService,private userStoryService: UserStoryService) {}

  ngOnInit(): void {
    this.loadTasks(); 
    this.loadUserStories();
  }

  onSubmit() {
    if (this.isEditMode && this.selectedTask.id) {
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
      this.closePopup();
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  selectTask(task: Task) {
    this.selectedTask = { ...task };
    this.isEditMode = true;
  }

  closePopup() {
    this.isEditMode = false;
    this.clearSelection();
  }

  clearSelection() {
    this.selectedTask = {
      title: '',
      description: '',
      startedAt: '',
      endedAt: '',
      state: 'IN_PROGRESS',
      priority: 'MEDIUM',
      collaborators: [] 
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

  






  goToStep(step: number) {
    this.currentStep = step;
  }

  










  onSubmitStory(): void {
    this.createUserStory(this.newUserStory);
  }

  onUpdate(): void {
    this.updateUserStory(this.selectedUserStory);
    this.closeEditPopup();
  }

  loadUserStories(): void {
    this.userStoryService.getAllUserStories().subscribe(userStories => {
      console.log('Loaded user stories:', userStories); // Add this line
      this.userStories = userStories;
      this.filterUserStories();
    });
  }

 
  createUserStory(userStory: UserStory): void {
    if (userStory.taskId) {
      this.userStoryService.createUserStory(userStory, userStory.taskId).subscribe({
        next: () => {
          this.loadUserStories();
          this.clearForm();
        },
        error: (err) => {
          console.error('Error creating user story:', err);
        }
      });
    } else {
      console.error('No task ID provided in the form');
    }
  }

  updateUserStory(userStory: UserStory): void {
    console.log('Updating user story:', userStory); // Add this line
    if (userStory.id) {
      this.userStoryService.updateUserStory(userStory.id, userStory).subscribe(() => this.loadUserStories());
    }
  }

  deleteUserStory(id: string): void {
    this.userStoryService.deleteUserStory(id).subscribe(() => this.loadUserStories());
  }

  openEditPopup(userStory: UserStory): void {
    this.selectedUserStory = { ...userStory };
    this.isPopupVisible = true;
  }

  closeEditPopup(): void {
    this.isPopupVisible = false;
  }

  clearForm(): void {
    this.newUserStory = { title: '', description: '', taskId: '' };
  }

  toggleTaskId(taskId: string): void {
    if (this.currentTaskId === taskId) {
      this.currentTaskId = '';  // Hide user stories if the same task is clicked again
      this.filteredUserStories = [];
    } else {
      this.currentTaskId = taskId;
      this.filterUserStories();  // Filter user stories for the selected task
    }
  }

  filterUserStories(): void {
    this.filteredUserStories = this.userStories.filter(us => us.taskId === this.currentTaskId);
  }
}



