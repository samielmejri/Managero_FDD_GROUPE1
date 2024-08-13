export interface Task {
    id?: string;
    title: string;
    description: string;
    startedAt: string;
    endedAt: string;
    state: 'IN_PROGRESS' | 'DONE' | 'PAUSED' | 'PLANNING' | 'CANCELED';
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    collaborators?: { name: string; email: string }[];
    userStories?: { id?: string; title: string; description: string; taskId?: string }[];
  }
  