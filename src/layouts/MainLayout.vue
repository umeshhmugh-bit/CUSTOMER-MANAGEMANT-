<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <q-header class="glass-header q-py-sm">
      <q-toolbar>
        <div class="row items-center cursor-pointer" @click="$router.push('/')">
          <q-avatar size="42px" class="q-mr-sm">
            <q-icon name="auto_awesome" color="cyan" size="32px" />
          </q-avatar>
          <div class="column">
            <span
              class="text-h6 text-weight-bolder text-white rubik tracking-tighter"
              style="line-height: 1"
            >
              UG<span class="text-cyan">Management</span>
            </span>
            <span
              class="text-caption text-cyan-4 text-weight-medium"
              style="font-size: 10px; letter-spacing: 2px"
              >ADVANCED ERP</span
            >
          </div>
        </div>

        <q-space />

        <!-- Desktop Navigation -->
        <div class="gt-xs row q-gutter-x-md items-center">
          <q-btn flat no-caps label="Features" class="text-grey-4 nav-link" />
          <q-btn flat no-caps label="Solutions" class="text-grey-4 nav-link" />
          <q-btn flat no-caps label="Pricing" class="text-grey-4 nav-link" />

          <q-btn
            flat
            no-caps
            label="Login"
            :to="user ? '/dashboard' : '/login'"
            class="text-white nav-link"
          />
        </div>

        <!-- Mobile Menu Toggle -->
        <q-btn flat dense round icon="menu" class="lt-sm text-cyan" @click="toggleLeftDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="right" overlay behavior="mobile" class="glass-drawer">
      <q-list padding class="text-white">
        <q-item-label header class="text-cyan text-weight-bold">Navigation</q-item-label>
        <q-item clickable v-ripple to="/" @click="leftDrawerOpen = false">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/login" v-if="!user" @click="leftDrawerOpen = false">
          <q-item-section avatar><q-icon name="login" /></q-item-section>
          <q-item-section>Login</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/dashboard" v-if="user" @click="leftDrawerOpen = false">
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Futuristic Footer -->
    <footer class="q-pa-xl bg-deep-space text-white border-top-glass">
      <div class="row q-col-gutter-xl justify-between">
        <div class="col-12 col-md-4">
          <div class="row items-center q-mb-md">
            <q-icon name="auto_awesome" color="cyan" size="32px" class="q-mr-sm" />
            <span class="text-h5 text-weight-bolder rubik"
              >UG<span class="text-cyan">Management</span></span
            >
          </div>
          <p class="text-grey-5 leading-relaxed">
            The next generation of cloud-based management systems. Built for speed, security, and
            absolute performance.
          </p>
          <div class="row q-gutter-sm">
            <q-btn round flat dense color="cyan" icon="facebook" />
            <q-btn round flat dense color="cyan" icon="twitter" />
            <q-btn round flat dense color="cyan" icon="linkedin" />
          </div>
        </div>
        <div class="col-6 col-md-2">
          <div class="text-weight-bold q-mb-md text-cyan">Product</div>
          <div class="column q-gutter-y-sm text-grey-5">
            <div class="cursor-pointer hover-cyan">Features</div>
            <div class="cursor-pointer hover-cyan">Security</div>
            <div class="cursor-pointer hover-cyan">API</div>
          </div>
        </div>
        <div class="col-6 col-md-2">
          <div class="text-weight-bold q-mb-md text-cyan">Company</div>
          <div class="column q-gutter-y-sm text-grey-5">
            <div class="cursor-pointer hover-cyan">About</div>
            <div class="cursor-pointer hover-cyan">Blog</div>
            <div class="cursor-pointer hover-cyan">Careers</div>
          </div>
        </div>
      </div>
      <q-separator dark class="q-my-xl" style="opacity: 0.05" />
      <div class="text-center text-grey-6 text-caption">
        © 2026 UGManagement Systems. All rights reserved.
      </div>
    </footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth-store'

const $router = useRouter()
const authStore = useAuthStore()
const leftDrawerOpen = ref(false)

const user = computed(() => authStore.user)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.main-layout {
  background: #050505;
}

.glass-header {
  background: rgba(5, 5, 5, 0.7);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 1000;
}

.nav-link {
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.nav-link:hover {
  color: #00f3ff !important;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.4);
}

.glass-avatar {
  border: 1px solid rgba(0, 243, 255, 0.3);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
}

.border-top-glass {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.hover-cyan:hover {
  color: #00f3ff;
  transition: color 0.3s;
}

.glass-drawer {
  background: rgba(10, 10, 10, 0.9) !important;
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.bg-deep-space {
  background: #050505;
}
</style>
