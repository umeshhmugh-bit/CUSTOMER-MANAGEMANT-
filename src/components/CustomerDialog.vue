<template>
  <q-dialog :model-value="modelValue" persistent @update:model-value="updateModelValue">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ isEdit ? 'Edit Customer' : 'Add Customer' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="form.name"
            label="Name"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type something']"
          />

          <q-input
            filled
            v-model="form.email"
            label="Email"
            type="email"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Please type a valid email']"
          />

          <q-input
            filled
            v-model="form.phone"
            label="Phone"
            mask="###-###-####"
            hint="Format: ###-###-####"
          />

          <q-input filled v-model="form.address" label="Address" type="textarea" />

          <div align="right">
            <q-btn
              label="Cancel"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
              @click="onCancel"
            />
            <q-btn label="Save" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  customerToEdit: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'save'])

const form = ref({
  id: null,
  name: '',
  email: '',
  phone: '',
  address: '',
})

const isEdit = computed(() => !!props.customerToEdit)

watch(
  () => props.customerToEdit,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal }
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

function resetForm() {
  form.value = {
    id: null,
    name: '',
    email: '',
    phone: '',
    address: '',
  }
}

function updateModelValue(val) {
  emit('update:modelValue', val)
}

function onCancel() {
  updateModelValue(false)
  resetForm()
}

function onSubmit() {
  emit('save', { ...form.value })
  updateModelValue(false)
  resetForm()
}
</script>
