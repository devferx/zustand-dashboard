import { create, type StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools, persist } from 'zustand/middleware'
// import { produce } from 'immer'

import type { Task, TaskStatus } from '../../interfaces'

interface TaskState {
  tasks: Record<string, Task>

  draggingTaskId?: string
  setDraggingTaskId: (tasdId: string) => void
  removeDraggingTaskId: () => void
  changeTaskStatus: (taskId: string, status: TaskStatus) => void
  onTaskDrop: (status: TaskStatus) => void

  getTaskByStatus: (status: TaskStatus) => Task[]
  addTask: (title: string, status: TaskStatus) => void
}

const storeApi: StateCreator<TaskState, [['zustand/immer', never]]> = (
  set,
  get,
) => ({
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
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [taskId]: task,
    //   },
    // }))

    set((state) => {
      state.tasks[taskId].status = status
    })
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
  addTask: (title, status) => {
    const newTask: Task = { id: crypto.randomUUID(), title, status }

    set((state) => {
      state.tasks[newTask.id] = newTask
    })

    // Immer example
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask
    //   }),
    // )

    // immer way
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   },
    // }))
  },
})

export const useTaskStore = create<TaskState>()(
  devtools(persist(immer(storeApi), { name: 'tasks-store' })),
)
