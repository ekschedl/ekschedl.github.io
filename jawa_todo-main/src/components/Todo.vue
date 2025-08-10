<template>

  <v-container class="fill-height d-flex align-start" max-width="900" style="padding-top: 10vh">
    <v-row class="w-100 mt-20" justify="center">

      <v-col cols="12" md="8" lg="6">
        <div class="text-center">
          <v-img class="mb-8" height="100" src="@/assets/todo.svg" />
          <h1 class="text-h2 font-weight-bold mb-16">ToDo App</h1>

          <!-- Eingabe für neue Aufgabe -->
          <v-row no-gutters class="d-flex align-center">
            <v-col cols="9">
              <v-text-field
                v-model="newTask"
                label="Was willst du erledigen?"
                @keyup.enter="addTask"
                clearable
                outlined
                dense
                placeholder="Aufgabe hinzufügen..."
                variant="solo"
                color="orange"
                full-width
                class="task-input"
              />
            </v-col>
            <v-col cols="3">
              <v-btn
                color="orange"
                @click="addTask"
                elevation="2"
                full-width
                outlined
                class="d-flex align-center"
                style="height: 56px;"
              >
                <v-icon left>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <!-- Aufgabenliste oder "Liste ist leer" Hinweis -->
          <template v-if="taskStore.tasks.length > 0">
            <v-list-item
              class="task-item"
              v-for="(task, index) in sortedTasks"
              :key="index"
              :class="{ 'completed-task': task.completed, 'active-task': !task.completed }"
            >
              <v-row align="center" class="w-100 px-2 task-row">
                <!-- Checkbox und Text -->
                <v-col cols="7" class="d-flex align-center">
                  <v-checkbox
                    v-model="task.completed"
                    :label="task.title"
                    color="green"
                    hide-details
                    class="mr-2"
                  />
                </v-col>

                <!-- Datum -->
                <v-col cols="3">
                  <div class="text-caption text-grey">
                    {{ formatDate(task.timestamp) }}
                  </div>
                </v-col>

                <!-- Papierkorb -->
                <v-col class="text-right" cols="2" v-if="!task.completed">
                  <v-btn
                    icon
                    size="small"
                    variant="text"
                    class="delete-btn"
                    @click="deleteTask(index)"
                    aria-label="Löschen"
                  >
                    <v-icon size="20">mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>
          </template>

          <!-- Hinweis, wenn keine Aufgaben -->
          <template v-else>
            <div class="mt-10 text-grey text-center">
              <v-icon size="40" color="grey">mdi-format-list-bulleted</v-icon>
              <p class="text-subtitle-1 mt-2">Die Liste ist leer</p>
            </div>
          </template>

          <!-- Button: Alle löschen -->
          <template v-if="taskStore.tasks.length > 0">
            <v-row justify="center" class="mt-6">
              <v-btn
                class="delete-all-btn"
                color="red"
                variant="outlined"
                @click="clearAllTasks"
              >
                <v-icon left>mdi-delete-forever</v-icon>
                Alle Aufgaben löschen
              </v-btn>
            </v-row>
          </template>

        </div>

      </v-col>
    </v-row>

  </v-container>



</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/app'
const taskStore = useTaskStore()
const newTask = ref('')

// Aufgabe hinzufügen
const addTask = () => {
  taskStore.addTask(newTask.value)
  newTask.value = ''
}

// Aufgabe löschen
const deleteTask = (index: number) => {
  taskStore.deleteTask(index)
}

// Alle Aufgaben löschen
const clearAllTasks = () => {
  if (confirm('Willst du wirklich **alle** Aufgaben löschen?')) {
    taskStore.clearAll()
  }
}

// Sortierte Aufgabenliste
const sortedTasks = computed(() => taskStore.sortedTasks)

// Datumsformatierung
const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  return date.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.completed-task {
  text-decoration: line-through;
  text-decoration-color: green;
  color: green;
  background-color: #e8f5e9 !important;
  border-left: 4px solid green;
}
.active-task {
  color: #000;
  background-color: #f1f1f1;
}
.task-input {
  height: 56px !important;
}
.v-btn, .v-text-field {
  width: 100% !important;
}
.delete-btn {
  min-width: 32px;
  height: 32px;
  padding: 0;
}
.task-item {
  margin-top: 5px;
}
.delete-all-btn {
  width: 50% !important;
  margin: 0 auto;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.delete-all-btn:hover {
  background-color: #ff4d4d !important; /* sanftes Hellrot */
  color: white !important;
}
</style>
