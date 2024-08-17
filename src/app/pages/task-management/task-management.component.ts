import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../../service/task/task.service';
import { Task } from '../../models/task.model';




import { UserStoryService } from '../../service/user-story/user-story.service';
import { UserStory } from '../../models/user-story.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  taskForm: FormGroup;

  @Output() taskSelected = new EventEmitter<string>();







  userStories: UserStory[] = [];
  filteredUserStories: UserStory[] = [];
  selectedUserStory: UserStory = { title: '', description: '', taskId: '' };
  newUserStory: UserStory = { title: '', description: '', taskId: '' };
  currentTaskId: string = '';
  isPopupVisible: boolean = false;


  currentStep: number = 1;






  archivedTasks: Task[] = [];
  archivedUserStories: UserStory[] = [];

  selectedTaskName: string = '';
  
  
  showSuccess: boolean = false;

  showSuccessss: boolean = false;

  showSuccessedittask: boolean = false;

  showSuccessarchive: boolean = false;

  showSuccesseditstory: boolean = false;

  showSuccessarchivestory: boolean = false;

  showSuccessrestoretask: boolean = false;

  showSuccessrestorestory: boolean = false;

  showSuccessdeletetask: boolean = false;

  showSuccessdeletestory: boolean = false;

  constructor(private taskService: TaskService,private userStoryService: UserStoryService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadTasks(); 
    this.loadUserStories();
    this.loadArchivedTasks();
    this.loadArchivedUserStories();  
  
      // Initialize the form and form controls
      this.taskForm = this.fb.group({
        taskId: ['', Validators.required]
        // Add other form controls here if necessary
      });
    }
  

  onSubmit() {
    if (this.isEditMode && this.selectedTask.id) {
      this.updateTask(this.selectedTask);
    } else {
      this.createTask(this.selectedTask);
    }

    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      if (this.isEditMode && this.selectedTask.id) {
        this.updateTask(this.selectedTask);
      } else {
        const task = { ...this.selectedTask, id: formValue.taskId };
        this.createTask(task);
      }
    }


    this.showSuccessss = true;
    setTimeout(() => {
      this.showSuccessss = false;
    }, 5000);
    
  
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

    this.showSuccessedittask = true;
    setTimeout(() => {
      this.showSuccessedittask = false;
    }, 5000);
  }

  archiveTask(id: string) {
    this.taskService.archiveTask(id).subscribe(() => {
      // Remove from active tasks
      this.tasks = this.tasks.filter((task) => task.id !== id);
      // Load the updated archived tasks list
      this.loadArchivedTasks();
    });
    console.log(`Task ${id} archived.`);
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
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, 5000);
  }


  onUpdate(): void {
    this.updateUserStory(this.selectedUserStory);
    this.closeEditPopup();
    this.showSuccesseditstory = true;
    setTimeout(() => {
      this.showSuccesseditstory = false;
    }, 5000);
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

  archiveUserStory(id: string): void {
    this.userStoryService.archiveUserStory(id).subscribe(() => {
      // Remove from active user stories
      this.userStories = this.userStories.filter((story) => story.id !== id);
      this.filteredUserStories = this.filteredUserStories.filter((story) => story.id !== id); // Update the filtered list
      // Load the updated archived user stories list
      this.loadUserStories();
      this.loadArchivedUserStories();
    });
    console.log(`User story ${id} archived.`);
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

  











  loadArchivedTasks() {
    console.log(this.tasks);
    this.taskService.getArchivedTasks().subscribe(tasks => this.archivedTasks = tasks);
  }

  loadArchivedUserStories() {
    this.userStoryService.getArchivedUserStories().subscribe(userStories => this.archivedUserStories = userStories);
  }

  restoreTask(taskId: string) {
        console.log(`Restoring task with id: ${taskId}`);
    this.taskService.restoreTask(taskId).subscribe((restoredTask) => {
      console.log('Task restored:', restoredTask);
      // Push the restored task to the tasks array
      this.loadTasks(); 
      this.loadArchivedTasks();
      this.tasks.push(restoredTask);
      // Optionally remove the restored task from archived tasks
      this.archivedTasks = this.archivedTasks.filter(task => task.id !== taskId);
    });
    this.currentStep =4;

    this.showSuccessrestoretask = true;
    setTimeout(() => {
      this.showSuccessrestoretask = false;
    }, 5000);
  }
    

  restoreUserStory(userStoryId: string) {
    this.userStoryService.restoreUserStory(userStoryId).subscribe((restoredUserStory) => {
      // Push the restored user story to the userStories array
      this.loadUserStories();
      this.loadArchivedUserStories();
      this.userStories.push(restoredUserStory);
      if (restoredUserStory.taskId === this.currentTaskId) {
        this.filteredUserStories.push(restoredUserStory); // Update the filtered list
      }
      // Optionally remove the restored user story from archived user stories
      this.archivedUserStories = this.archivedUserStories.filter(story => story.id !== userStoryId);
    });
    this.currentStep = 4;

    this.showSuccessrestorestory = true;
    setTimeout(() => {
      this.showSuccessrestorestory = false;
    }, 5000);
  }
  
  
  deleteTaskPermanently(id: string) {
    this.taskService.deleteTask(id).subscribe(() => this.loadArchivedTasks());
    this.showSuccessdeletetask = true;
    setTimeout(() => {
      this.showSuccessdeletetask = false;
    }, 5000);
  }

  deleteUserStoryPermanently(id: string) {
    this.userStoryService.deleteUserStory(id).subscribe(() => this.loadArchivedUserStories());

    this.showSuccessdeletestory = true;
    setTimeout(() => {
      this.showSuccessdeletestory = false;
    }, 5000);
  }

  









  // Method to confirm and archive a task
confirmArchiveTask(taskId: string) {
  if (confirm('Are you sure you want to archive this task?')) {
    this.archiveTask(taskId);
  }
  this.showSuccessarchive = true;
  setTimeout(() => {
    this.showSuccessarchive = false;
  }, 5000);
}

// Method to confirm and archive a user story
confirmArchiveUserStory(userStoryId: string) {
  if (confirm('Are you sure you want to archive this user story?')) {
    this.archiveUserStory(userStoryId);
  }
  this.showSuccessarchivestory = true;
  setTimeout(() => {
    this.showSuccessarchivestory = false;
  }, 5000);
}








onTaskNameChange(event: any) {
  const selectedTask = this.tasks.find(task => task.title === event.target.value);
  if (selectedTask) {
    this.newUserStory.taskId = selectedTask.id;
  }
}


}




