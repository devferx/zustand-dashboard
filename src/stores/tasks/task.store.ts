import { create, type StateCreator } from 'zustand'
import type { Task, TaskStatus } from '../../interfaces'
import { devtools } from 'zustand/middleware'

interface TaskState {
  tasks: Record<string, Task>

  draggingTaskId?: string
  setDraggingTaskId: (tasdId: string) => void
  removeDraggingTaskId: () => void
  changeTaskStatus: (taskId: string, status: TaskStatus) => void
  onTaskDrop: (status: TaskStatus) => void

  getTaskByStatus: (status: TaskStatus) => Task[]
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
    'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
  },

  draggingTaskId: undefined,
  setDraggingTaskId: (taskId) => {
    set({ draggingTaskId: taskId })
  },
  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined })
  },
  changeTaskStatus: (taskId, status) => {
    const task = get().tasks[taskId]
    task.status = status

    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }))
  },
  onTaskDrop: (status) => {
    const taskId = get().draggingTaskId
    if (!taskId) return

    get().changeTaskStatus(taskId, status)
    get().removeDraggingTaskId()
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = Object.values(get().tasks)
    return tasks.filter((task) => task.status === status)
  },
})

export const useTaskStore = create<TaskState>()(devtools(storeApi))
