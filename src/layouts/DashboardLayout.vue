<template>
  <q-layout view="lHh Lpr lff" class="dashboard-layout">
    <!-- Floating Header -->
    <q-header class="bg-transparent q-pa-md z-top">
      <q-toolbar class="glass-header text-charcoal">
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title class="text-weight-bold">
          UG<span class="text-slate-blue">Management</span>
        </q-toolbar-title>

        <q-space />

        <div class="row items-center q-gutter-x-sm">
          <!-- Header Actions can go here if needed -->
        </div>
      </q-toolbar>
    </q-header>

    <!-- Floating Sidebar -->
    <q-drawer v-model="drawer" show-if-above :width="260" :breakpoint="700" class="bg-transparent">
      <div class="glass-sidebar fit column no-wrap q-ma-md q-pa-md">
        <div class="column q-gutter-y-sm">
          <q-btn
            v-for="link in links"
            :key="link.label"
            :icon="link.icon"
            :label="link.label"
            align="left"
            flat
            no-caps
            class="sidebar-btn"
            :class="{ active: link.label === 'Dashboard' }"
          />
        </div>

        <q-space />

        <!-- Unified User Profile Section -->
        <div class="glass-card-mini q-pa-sm q-mt-auto">
          <div class="row items-center no-wrap q-pa-sm">
            <q-avatar size="40px" class="shadow-2">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="q-ml-sm overflow-hidden text-left col">
              <div class="text-subtitle2 text-weight-bold text-charcoal ellipsis">
                {{ userName }}
              </div>
              <div class="text-caption text-grey-7">Admin</div>
            </div>
          </div>

          <div class="row q-mt-xs q-gutter-x-xs">
            <q-btn
              flat
              dense
              size="sm"
              icon="settings"
              label="Profile"
              class="col text-grey-8 bg-grey-3"
              to="/dashboard/profile"
              no-caps
            />
            <q-btn
              flat
              dense
              size="sm"
              icon="logout"
              class="col-auto text-red bg-red-1"
              @click="handleLogout"
            />
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth-store'

const router = useRouter()
const authStore = useAuthStore()
const drawer = ref(true)

const userName = computed(() => authStore.user?.user_metadata?.full_name || 'User')

const links = [
  { icon: 'dashboard', label: 'Dashboard' },
  { icon: 'shopping_bag', label: 'Products' },
  { icon: 'people', label: 'Customers' },
  { icon: 'receipt_long', label: 'Transactions' },
  { icon: 'analytics', label: 'Analytics' },
  { icon: 'settings', label: 'Settings' },
]

const handleLogout = async () => {
  try {
    await authStore.logout()
    // Explicitly redirect to home
    await router.replace('/')
  } catch (error) {
    console.error('Logout failed:', error)
    // Force redirect anyway
    await router.replace('/')
  }
}
</script>

<style scoped>
.dashboard-layout {
  background: #f4f7f6; /* Sophisticated neutral light grey */
  color: #2d3436;
}

/* Colors */
.text-charcoal {
  color: #2d3436;
}
.text-slate-blue {
  color: #5b6b8c;
}
.bg-soft-emerald {
  background: #55efc4;
}
.text-soft-emerald {
  color: #00b894;
}

/* Structures */
.glass-header {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.05);
}

.glass-sidebar {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08); /* Anti-gravity shadow */
}

/* Mobile adjustments */
@media (max-width: 699px) {
  .glass-sidebar {
    border-radius: 0;
    margin: 0 !important;
    height: 100% !important;
  }
}

.sidebar-btn {
  border-radius: 12px;
  color: #636e72;
  font-weight: 500;
  transition: all 0.3s ease;
}

.sidebar-btn:hover {
  background: rgba(91, 107, 140, 0.1);
  color: #2d3436;
  padding-left: 20px; /* Slight movement */
}

.sidebar-btn.active {
  background: #5b6b8c;
  color: white;
  box-shadow: 0 4px 15px rgba(91, 107, 140, 0.4);
}

.glass-card-mini {
  background: rgba(244, 247, 246, 0.7);
  border-radius: 12px;
}
</style>
