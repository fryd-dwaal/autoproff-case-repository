<script lang="ts" setup>
import { ref, reactive } from "vue";
import { addUser } from "~/api/user";
import { User } from "~/types/user";
import { useVuelidate } from "@vuelidate/core";

import {
  email,
  maxLength,
  minLength,
  numeric,
  required,
} from "@vuelidate/validators";

const props = defineProps<{ visible: boolean }>();
const localVisibleValue = ref(props.visible);

watch(props, () => {
  localVisibleValue.value = props.visible;
});

const emit = defineEmits(["update:visible"]);

const workshopNames = ref<User["workshop"][]>(["North", "South", "West"]);

const user = reactive<User>({
  firstName: "",
  lastName: "",
  workshop: "",
  phone: "",
  email: "",
  jobTitle: "",
});

const resetState = () => {
  v$.value.$reset();
  user.firstName = "";
  user.lastName = "";
  user.workshop = "";
  user.phone = "";
  user.email = "";
  user.jobTitle = "";
};

const validations = ref({
  firstName: { required },
  lastName: { required },
  workshop: { required },
  phone: {
    required,
    numeric,
    minLengthValue: minLength(8),
    maxLengthValue: maxLength(12),
  },
  email: { required, email },
  jobTitle: { required },
});

const v$ = useVuelidate(validations, user);

const onCancel = () => {
  localVisibleValue.value = false;
  resetState();
  emit("update:visible", false);
};

const onConfirm = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  await addUser(user);
  resetState();
  onCancel();
};
</script>

<template>
  <Dialog
    position="top"
    header="Add new employee"
    v-model:visible="localVisibleValue"
    :breakpoints="{ '700px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
    @afterHide="onCancel"
  >
    <form @submit.prevent="onConfirm">
      <div class="field">
        <label for="first-name">First Name</label>
        <InputText
          autofocus
          @blur="v$.firstName.$touch"
          id="first-name"
          type="fname"
          aria-describedby="firstname-help"
          v-model="user.firstName"
          @keydown.enter="onConfirm"
        />
        <small id="firstname-help" class="p-error" v-if="v$.firstName.$error"
          >Please input a valid first Name</small
        >
      </div>
      <div class="field">
        <label for="last-name">Last Name</label>
        <InputText
          @blur="v$.lastName.$touch"
          v-model="user.lastName"
          id="last-name"
          type="lname"
          aria-describedby="lastname-help"
          @keydown.enter="onConfirm"
        />
        <small id="lastname-help" class="p-error" v-if="v$.lastName.$error"
          >Please input a valid last name</small
        >
      </div>

      <div class="field">
        <label for="workshop-name">Workshop</label>
        <Dropdown
          id="workshop-name"
          v-model="user.workshop"
          :options="workshopNames"
          placeholder="Select workshop name"
        />
        <small id="workshop-name-help" class="p-error" v-if="v$.workshop.$error"
          >Please select a workshop</small
        >
      </div>

      <div class="field">
        <label for="phone-number">Phone number</label>
        <InputText
          id="phone-number"
          @blur="v$.phone.$touch"
          v-model="user.phone"
          type="phone"
          aria-describedby="phone-help"
          @keydown.enter="onConfirm"
        />
        <small id="phone-help" class="p-error" v-if="v$.phone.$error"
          >Please input a valid phone number. It should contain between 8 and 12
          numbers</small
        >
      </div>

      <div class="field">
        <label for="email">Email</label>
        <InputText
          @blur="v$.email.$touch"
          id="email"
          type="email"
          aria-describedby="email-help"
          v-model="user.email"
          @keydown.enter="onConfirm"
        />
        <small id="email-help" class="p-error" v-if="v$.email.$error"
          >Please input a valid email</small
        >
      </div>

      <div class="field">
        <label for="job-title">Job title</label>
        <InputText
          v-model="user.jobTitle"
          @blur="v$.jobTitle.$touch"
          id="job-title"
          type="text"
          aria-describedby="job-title-help"
          @keydown.enter="onConfirm"
        />
        <small id="job-title-help" class="p-error" v-if="v$.jobTitle.$error"
          >Please input a job title</small
        >
      </div>
    </form>

    <template #footer>
      <Button label="Cancel" @click="onCancel" class="p-button-text" />
      <Button label="Add employee" @click="onConfirm" />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
  label,
  small {
    display: block;
  }
  :deep(.p-inputtext),
  :deep(.p-dropdown) {
    width: 100%;
  }
}
</style>
