<script lang="ts" setup>
import { ref } from "vue";
import { User } from "~/types/user";
import { deleteUser } from "~/api/user";
const props = defineProps<{
  visible: boolean;
  selectedUser: User | undefined;
}>();
const localVisibleValue = ref(props.visible);

const emit = defineEmits(["update:visible"]);

const onCancel = () => {
  localVisibleValue.value = false;
  emit("update:visible", false);
};

const onConfirm = async () => {
  if (props.selectedUser && props.selectedUser.id) {
    await deleteUser(props.selectedUser.id);
  }

  onCancel();
};

watch(props, () => (localVisibleValue.value = props.visible));
</script>

<template>
  <Dialog
    header="Confirmation"
    v-model:visible="localVisibleValue"
    :style="{ width: '350px' }"
    :modal="true"
    @afterHide="onCancel"
  >
    <div class="confirmation-content">
      <span>Are you sure you want to proceed?</span>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        @click="onCancel"
        class="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        @click="onConfirm"
        class="p-button-text"
        autofocus
      />
    </template>
  </Dialog>
</template>
