<script lang="ts" setup>
import { ref } from "vue";
import { User } from "~/types/user";
import { FilterMatchMode } from "primevue/api";
const props = defineProps<{ users: User[] }>();
const emit = defineEmits(["onEdit", "onDelete"]);

const sortableColumns = ref(["firstName", "lastName"]);

const filter = ref<any>({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const getDisplayName = (userProperty: string) => {
  switch (userProperty) {
    case "firstName":
      return "First Name";
    case "lastName":
      return "Last name";
    case "workshop":
      return "Workshop";
    case "phone":
      return "Phone";
    case "email":
      return "Email";
    case "jobTitle":
      return "Job title";
  }
};

const onDelete = (user: any) => emit("onDelete", user);
</script>

<template>
  <DataTable
    class="the-table"
    :value="users"
    :paginator="users.length >= 30"
    :rows="30"
    v-model:filters="filter"
    dataKey="id"
    stateStorage="session"
    stateKey="employee-table"
    responsiveLayout="scroll"
  >
    <template #header>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          v-model="filter['global'].value"
          placeholder="Search by any value"
        />
      </span>
    </template>
    <template v-for="key in Object.keys(props.users[0])" :key="key">
      <Column
        :field="key"
        :header="getDisplayName(key)"
        :sortable="sortableColumns.includes(key)"
        v-if="key !== 'id'"
      >
        <template #body="slotProps">
          {{ slotProps.data[key] }}
        </template>
      </Column>
    </template>

    <Column>
      <template #body="slotProps">
        <Button
          icon="pi pi-times"
          class="p-button-rounded p-button-danger"
          @click="() => onDelete(slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<style lang="scss" scoped>
.the-table {
  border-left: 1px solid #e9ecef;
  border-right: 1px solid #e9ecef;
}
</style>
