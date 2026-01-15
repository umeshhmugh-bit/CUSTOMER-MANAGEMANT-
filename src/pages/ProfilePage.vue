<template>
  <q-page class="q-pa-md settings-page">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <div class="text-h4 text-weight-bold text-charcoal q-mb-lg rubik">Settings</div>

        <q-card class="antigravity-card overflow-hidden">
          <div class="row no-wrap h-100">
            <!-- Sidebar Tabs (Desktop) -->
            <div class="col-auto gt-sm bg-grey-1 border-right">
              <q-tabs
                v-model="tab"
                vertical
                class="text-grey-7"
                active-color="primary"
                indicator-color="primary"
                style="height: 100%; min-width: 200px"
              >
                <q-tab
                  name="general"
                  icon="person"
                  label="General"
                  class="q-py-md justify-start"
                  style="min-height: 60px"
                />
                <q-tab
                  name="security"
                  icon="security"
                  label="Security"
                  class="q-py-md justify-start"
                  style="min-height: 60px"
                />
                <q-tab
                  name="preferences"
                  icon="tune"
                  label="Preferences"
                  class="q-py-md justify-start"
                  style="min-height: 60px"
                />
              </q-tabs>
            </div>

            <!-- Mobile Tabs (Top) -->
            <div class="col-12 lt-md bg-grey-1 border-bottom">
              <q-tabs
                v-model="tab"
                class="text-grey-7"
                active-color="primary"
                indicator-color="primary"
                align="justify"
              >
                <q-tab name="general" icon="person" />
                <q-tab name="security" icon="security" />
                <q-tab name="preferences" icon="tune" />
              </q-tabs>
            </div>

            <!-- Content -->
            <div class="col">
              <q-tab-panels v-model="tab" animated transition-prev="fade" transition-next="fade">
                <!-- General Tab -->
                <q-tab-panel name="general" class="q-pa-lg">
                  <div class="text-h6 text-weight-bold q-mb-md">Public Profile</div>

                  <q-form @submit.prevent="updateProfile" class="q-gutter-y-md">
                    <!-- Avatar Upload (Simulated) -->
                    <div class="row items-center q-mb-md">
                      <q-avatar size="80px" class="shadow-3">
                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                        <q-btn
                          round
                          color="primary"
                          icon="edit"
                          size="xs"
                          class="absolute-bottom-right"
                        />
                      </q-avatar>
                      <div class="q-ml-md">
                        <div class="text-subtitle2 text-weight-bold">Profile Picture</div>
                        <div class="text-caption text-grey-6">PNG, JPG up to 5MB</div>
                      </div>
                    </div>

                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <q-input
                          v-model="form.fullName"
                          label="Full Name"
                          filled
                          class="glass-input-light"
                          :rules="[(val) => !!val || 'Required']"
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          v-model="form.username"
                          label="Username"
                          filled
                          class="glass-input-light"
                          hint="Visible to other users"
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          v-model="form.company"
                          label="Company"
                          filled
                          class="glass-input-light"
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          v-model="currentEmail"
                          label="Email"
                          filled
                          readonly
                          class="glass-input-light"
                          hint="Managed via Auth Provider"
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          v-model="form.phone"
                          label="Phone"
                          filled
                          class="glass-input-light"
                          mask="### #### ####"
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          v-model="currentRole"
                          label="Role"
                          filled
                          readonly
                          class="glass-input-light"
                        />
                      </div>
                      <div class="col-12">
                        <q-input
                          v-model="form.address"
                          label="Address"
                          filled
                          type="textarea"
                          autogrow
                          class="glass-input-light"
                        />
                      </div>
                    </div>

                    <div class="row justify-end q-mt-lg">
                      <q-btn
                        label="Save Changes"
                        type="submit"
                        color="primary"
                        unelevated
                        rounded
                        :loading="loading"
                      />
                    </div>
                  </q-form>
                </q-tab-panel>

                <!-- Security Tab -->
                <q-tab-panel name="security" class="q-pa-lg">
                  <div class="text-h6 text-weight-bold q-mb-md">Security Settings</div>
                  <div class="text-caption text-grey-7 q-mb-lg">
                    Ensure your account is using a long, random password to stay secure.
                  </div>

                  <q-form
                    @submit.prevent="updatePassword"
                    class="q-gutter-y-md"
                    style="max-width: 400px"
                  >
                    <q-input
                      v-model="passwordForm.new"
                      label="New Password"
                      type="password"
                      filled
                      class="glass-input-light"
                      :rules="[(val) => val.length >= 6 || 'Min 6 chars']"
                    />
                    <q-input
                      v-model="passwordForm.confirm"
                      label="Confirm Password"
                      type="password"
                      filled
                      class="glass-input-light"
                      :rules="[(val) => val === passwordForm.new || 'Passwords do not match']"
                    />

                    <div class="row justify-start q-mt-lg">
                      <q-btn
                        label="Update Password"
                        type="submit"
                        color="soft-emerald"
                        unelevated
                        rounded
                        :loading="loadingSecurity"
                        class="text-white"
                      />
                    </div>
                  </q-form>
                </q-tab-panel>

                <!-- Preferences Tab -->
                <q-tab-panel name="preferences" class="q-pa-lg">
                  <div class="text-h6 text-weight-bold q-mb-md">Preferences</div>

                  <q-list separator>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Theme</q-item-label>
                        <q-item-label caption>Customize your interface look</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-btn-toggle
                          v-model="pref.theme"
                          toggle-color="primary"
                          :options="[
                            { label: 'Light', value: 'light' },
                            { label: 'Dark', value: 'dark' },
                          ]"
                          unelevated
                          rounded
                          class="border-grey"
                          @update:model-value="toggleTheme"
                        />
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section>
                        <q-item-label>Language</q-item-label>
                        <q-item-label caption>Select system language</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-select
                          v-model="pref.language"
                          :options="['English', 'Sinhala']"
                          filled
                          dense
                          options-dense
                          style="min-width: 150px"
                          class="glass-input-light"
                          @update:model-value="savePreferences"
                        />
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section>
                        <q-item-label>Notifications</q-item-label>
                        <q-item-label caption>Receive email updates</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-toggle
                          v-model="pref.notifications"
                          color="primary"
                          @update:model-value="savePreferences"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth-store'

const $q = useQuasar()
const authStore = useAuthStore()
const tab = ref('general')
const loading = ref(false)
const loadingSecurity = ref(false)

const currentEmail = computed(() => authStore.user?.email || '')
const currentRole = computed(() => authStore.user?.user_metadata?.role || 'Admin') // Default to Admin for demo as requested

// General Form Data
const form = reactive({
  fullName: '',
  username: '',
  company: '',
  phone: '',
  address: '',
})

// Password Form Data
const passwordForm = reactive({
  new: '',
  confirm: '',
})

// Preferences Data
const pref = reactive({
  theme: 'light', // 'light' or 'dark'
  language: 'English',
  notifications: true,
})

onMounted(() => {
  const meta = authStore.user?.user_metadata || {}
  form.fullName = meta.full_name || ''
  form.username = meta.username || ''
  form.company = meta.company || ''
  form.phone = meta.phone || ''
  form.address = meta.address || ''

  pref.theme = meta.theme || 'light'
  pref.language = meta.language || 'English'
  pref.notifications = meta.notifications !== undefined ? meta.notifications : true

  // Apply initial theme
  $q.dark.set(pref.theme === 'dark')
})

const updateProfile = async () => {
  loading.value = true
  try {
    await authStore.updateUser({
      data: {
        full_name: form.fullName,
        username: form.username,
        company: form.company,
        phone: form.phone,
        address: form.address,
      },
    })
    $q.notify({ type: 'positive', message: 'Profile saved!' })
  } catch (e) {
    $q.notify({ type: 'negative', message: e.message })
  } finally {
    loading.value = false
  }
}

const updatePassword = async () => {
  loadingSecurity.value = true
  try {
    await authStore.updateUser({ password: passwordForm.new })
    $q.notify({ type: 'positive', message: 'Password updated' })
    passwordForm.new = ''
    passwordForm.confirm = ''
  } catch (e) {
    $q.notify({ type: 'negative', message: e.message })
  } finally {
    loadingSecurity.value = false
  }
}

const toggleTheme = (val) => {
  $q.dark.set(val === 'dark')
  savePreferences()
}

const savePreferences = async () => {
  try {
    await authStore.updateUser({
      data: {
        theme: pref.theme,
        language: pref.language,
        notifications: pref.notifications,
      },
    })
    // Silent update or optional notify
  } catch (e) {
    console.error('Error saving prefs', e)
  }
}
</script>

<style scoped>
.text-charcoal {
  color: #2d3436;
}
.antigravity-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
  min-height: 600px;
}
.border-right {
  border-right: 1px solid #eee;
}
.border-bottom {
  border-bottom: 1px solid #eee;
}
.glass-input-light :deep(.q-field__control) {
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}
.glass-input-light :deep(.q-field__control):hover {
  background: #fff;
  border-color: #e0e0e0;
}
/* Dark mode adjustments would be needed globally or here via body.body--dark */
</style>
