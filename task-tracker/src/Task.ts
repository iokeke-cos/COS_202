// Define interfaces for Task data
export interface TaskData {
  title: string;
  completed?: boolean;
  createdAt?: Date | string;
  description?: string;
}

export type Category = "work" | "personal" | "general" | "shopping" | "other";

// Task class with TypeScript types
export default class Task {
  title: string;
  completed: boolean;
  createdAt: Date;
  description: string;
  category: Category;

  constructor(
    title: string,
    description: string = "",
    category: Category = "general"
  ) {
    this.title = title;
    this.description = description;
    this.completed = false;
    this.createdAt = new Date();
    this.category = category;
  }

  // Method with return type annotation
  toggleComplete(): Task {
    this.completed = !this.completed;
    return this;
  }

  // Static method with parameter and return type
  static fromObject(obj: TaskData): Task {
    const task = new Task(obj.title, obj.description || "");

    if (obj.completed !== undefined) {
      task.completed = obj.completed;
    }

    if (obj.createdAt) {
      task.createdAt = new Date(obj.createdAt);
    }

    return task;
  }
}
