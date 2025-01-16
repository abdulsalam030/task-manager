export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  deadline?: string;
  completed: boolean;
}
