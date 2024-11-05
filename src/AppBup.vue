<script>
export default {
  data() {
    return {
      name: "Rabby Gwapo",
      status: "pending",
      tasks: ["TaskOne", "Task Two", "TaskThree"],
      link: "https://youtube.com",
    };
  },
  methods: {
    toggleStatus() {
      if (this.status === "active") {
        this.status = "pending";
      } else if (this.status === "pending") {
        this.status = "in-active";
      } else {
        this.status = "active";
      }
    },
  },
};
</script>
<template>
  <h1>Contacts</h1>
  <h2>{{ name }}</h2>
  <p v-if="status === 'active'">User is Active</p>
  <p v-else-if="status === 'pending'">User is Pending</p>
  <p v-else="status">User is In-active</p>

  <h3>Task:</h3>
  <ul>
    <li v-for="task in tasks" :key="task">{{ task }}</li>
  </ul>
  <!-- <a v-bind:href="link">Yamete!</a> -->
  <a :href="link">Yamete!</a>
  <br />
  <button @click="toggleStatus">Change Status</button>
</template>

<script setup>
import { ref, onMounted } from "vue";

const name = ref("Rabby Gwapo");
const status = ref("active");
const tasks = ref(["TaskOne", "Task Two", "TaskThree"]);
const newTask = ref("");
const toggleStatus = () => {
  if (status.value === "active") {
    status.value = "pending";
  } else if (status.value === "pending") {
    status.value = "in-active";
  } else {
    status.value = "active";
  }
};
const addNewTask = () => {
  if (newTask.value.trim() !== "") {
    tasks.value.push(newTask.value);
    newTask.value = "";
  }
};
const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};

onMounted(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    tasks.value = data.map((task) => task.title);
  } catch (error) {}
});
</script>
<template>
  <h1>Contacts</h1>
  <h2>{{ name }}</h2>
  <p v-if="status === 'active'">User is Active</p>
  <p v-else-if="status === 'pending'">User is Pending</p>
  <p v-else="status">User is In-active</p>
  <form @submit.prevent="addNewTask">
    <label for="task">Add Task </label>
    <input type="text" id="task" name="task" v-model="newTask" />
    <button type="submit">Add</button>
  </form>

  <h3>Task:</h3>
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span> {{ task }}</span> <button @click="deleteTask(index)">x</button>
    </li>
  </ul>
  <!-- <a v-bind:href="link">Yamete!</a> -->
  <!-- <a :href="link">Yamete!</a> -->
  <br />
  <button @click="toggleStatus">Change Status</button>
</template>
