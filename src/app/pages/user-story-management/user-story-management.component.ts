import { Component, OnInit } from '@angular/core';
import { UserStoryService } from '../../service/user-story/user-story.service';
import { UserStory } from '../../models/user-story.model';

@Component({
  selector: 'ngx-user-story-management',
  templateUrl: './user-story-management.component.html',
  styleUrls: ['./user-story-management.component.css']
})
export class UserStoryManagementComponent implements OnInit {
  userStories: UserStory[] = [];
  selectedUserStory: UserStory = { title: '', description: '', taskId: '' };
  currentTaskId: string = '';

  constructor(private userStoryService: UserStoryService) { }

  ngOnInit(): void {
    // Load user stories only if a task ID is present
    if (this.currentTaskId) {
      this.loadUserStories();
    }
  }

  onSubmit(): void {
    this.createUserStory(this.selectedUserStory);
  }

  loadUserStories(): void {
    if (this.currentTaskId) {
      this.userStoryService.getUserStories(this.currentTaskId).subscribe(userStories => this.userStories = userStories);
    }
  }

  createUserStory(userStory: UserStory): void {
    if (userStory.taskId) {
      console.log('Creating user story:', userStory); // Debug log
      this.userStoryService.createUserStory(userStory, userStory.taskId).subscribe({
        next: (response) => {
          console.log('User story created successfully:', response); // Debug log
          this.loadUserStories();
          this.clearSelection();
        },
        error: (err) => {
          console.error('Error creating user story:', err); // Log errors
        }
      });
    } else {
      console.error('No task ID provided in the form');
    }
  }

  updateUserStory(userStory: UserStory): void {
    if (userStory.id) {
      this.userStoryService.updateUserStory(userStory.id, userStory).subscribe(() => this.loadUserStories());
    }
  }

  deleteUserStory(id: string): void {
    this.userStoryService.deleteUserStory(id).subscribe(() => this.loadUserStories());
  }

  selectUserStory(userStory: UserStory): void {
    this.selectedUserStory = { ...userStory };
  }

  clearSelection(): void {
    this.selectedUserStory = { title: '', description: '', taskId: '' };
  }

  setTaskId(taskId: string): void {
    this.currentTaskId = taskId;
    this.loadUserStories();
  }
}
