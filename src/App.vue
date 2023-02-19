<script lang="ts" setup>
import { ref } from "vue";
import { useObservable, from } from "@vueuse/rxjs";
import { db } from "~/api/db";
import { liveQuery } from "dexie";
import { User } from "~/types/user";

const users = useObservable(
  from(liveQuery(async () => await db.users.toArray()))
);

const displayCreateUserModal = ref(false);
const displayDeleteUserModal = ref(false);

const onDeleteButtonClick = (user: User) => {
  displayDeleteUserModal.value = true;
  selectedUser.value = user;
};

const selectedUser = ref<User | undefined>();

const onKeydown = (event: KeyboardEvent) => {
  const excludedFocusElements = ["INPUT", "BUTTON"];
  const focusElTag = document.activeElement?.tagName || "";
  if (excludedFocusElements.includes(focusElTag)) return;

  if (event.key === "n") {
    event.preventDefault();
    displayCreateUserModal.value = true;
  }
};

onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});
</script>

<template>
  <div class="background">
    <main class="p-component container">
      <header class="the-header">
        <div>
          <h1>Employees</h1>
          <p>A list of all the employees in your company.</p>

          <p>Press "n" on your keyboard to add a new employee</p>
        </div>
        <Button
          @keyup.n="displayCreateUserModal = true"
          @click="displayCreateUserModal = true"
          type="button"
        >
          Add employee
        </Button>
      </header>

      <UserTable
        v-if="users && users.length"
        :users="users"
        @onDelete="onDeleteButtonClick"
      ></UserTable>

      <section v-else><p>Please add an employee to get started.</p></section>
    </main>

    <UserModalDelete
      v-model:visible="displayDeleteUserModal"
      :selected-user="selectedUser"
    ></UserModalDelete>

    <UserModalCreate v-model:visible="displayCreateUserModal"></UserModalCreate>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1400px;
  margin: auto;
  padding: 48px 74px;
  background: white;
  min-height: 100vh;
}

.background {
  background: #f9f9f9;
  min-height: 100vh;
}

.the-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 48px;
  p:last-of-type {
    margin-bottom: 0;
  }
}
</style>
