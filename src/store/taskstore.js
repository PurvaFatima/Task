// store/taskStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useTaskStore = create(persist((set) => ({
  // Initial state with sample tasks
  tasks: [
    {
      id: "1",
      name: "Create Mobile App",
      dueDate: "2026-01-20",
      assignee: "Saud Shaikh",
      priority: "Low",
      status: "Pending",
      description: "Develop a new mobile application for the client.",
    },
  ],
  
  // Task to be deleted (for dialog)
  deleteTask: null,
  
  // Task to show in details dialog
  detailTask: null,
  
  // Set tasks (useful for loading from API/database)
  setTasks: (tasks) => set({ tasks }),
  
  // Add a new task
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: Date.now().toString() }]
  })),
  
  // Delete a task
  removeTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== taskId)
  })),
  
  // Update task priority
  updateTaskPriority: (taskId, newPriority) => set((state) => {
    const updatedTasks = state.tasks.map((task) =>
      task.id === taskId ? { ...task, priority: newPriority } : task
    );
    const updatedTask = updatedTasks.find((t) => t.id === taskId);
    return {
      tasks: updatedTasks,
      detailTask: state.detailTask && state.detailTask.id === taskId ? updatedTask : state.detailTask,
    };
  }),
  
  // Update task status
  updateTaskStatus: (taskId, newStatus) => set((state) => {
    const updatedTasks = state.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    const updatedTask = updatedTasks.find((t) => t.id === taskId);
    return {
      tasks: updatedTasks,
      detailTask: state.detailTask && state.detailTask.id === taskId ? updatedTask : state.detailTask,
    };
  }),
  
  // Update entire task (for editing multiple fields)
  updateTask: (taskId, updatedFields) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedFields } : task
    )
  })),
  
  // Set delete task (for dialog)
  setDeleteTask: (task) => set({ deleteTask: task }),
  
  // Set detail task (for dialog)
  setDetailTask: (task) => set({ detailTask: task }),
  
  // Clear all tasks
  clearTasks: () => set({ tasks: [] }),
}), {
  name: 'task-store',
  // Persist only tasks; exclude dialog UI state
  partialize: (state) => ({ tasks: state.tasks }),
  storage: typeof window !== 'undefined' 
    ? createJSONStorage(() => localStorage) 
    : undefined,
}));

export default useTaskStore;