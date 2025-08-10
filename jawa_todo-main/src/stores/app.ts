import { defineStore } from 'pinia'


export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as { title: string; completed: boolean; timestamp: string }[]
  }),
  actions: {
    addTask(title: string) {
      if (title.trim()) {
        this.tasks.push({
          title: title.trim(),
          completed: false,
          timestamp: new Date().toISOString()
        })
      }
    },
    deleteTask(index: number) {
      this.tasks.splice(index, 1)
    },
    clearAll() {
      this.tasks = []
    }
  },
  getters: {
    sortedTasks: (state) =>
      state.tasks.slice().sort((a, b) => Number(a.completed) - Number(b.completed))
  },
  persist: true // bleibt gleich!
})

