<template>
  <q-page class="flex flex-center login-page">
    <!-- Home Button -->
    <q-btn
      icon="arrow_back"
      label="Home"
      to="/"
      flat
      rounded
      class="absolute-top-left q-ma-md home-btn z-top"
      no-caps
    />

    <div class="absolute-full bg-particles"></div>

    <div class="glass-card q-pa-xl column items-center z-top">
      <div class="text-h4 text-weight-bold text-white q-mb-md">
        {{ isLogin ? 'Welcome Back' : 'Create Account' }}
      </div>
      <div class="text-subtitle1 text-grey-4 q-mb-xl">
        {{ isLogin ? 'Sign in to UGManagement' : 'Join the revolution' }}
      </div>

      <q-form @submit.prevent="onSubmit" class="full-width q-gutter-y-md">
        <q-input
          v-if="!isLogin"
          v-model="fullName"
          dark
          filled
          label="Full Name"
          type="text"
          color="cyan"
          class="glass-input"
          :rules="[(val) => !!val || 'Name is required']"
        >
          <template v-slot:prepend>
            <q-icon name="person" color="cyan" />
          </template>
        </q-input>
        <q-input
          v-model="email"
          dark
          filled
          label="Email Address"
          type="email"
          color="cyan"
          class="glass-input"
          :rules="[(val) => !!val || 'Email is required']"
        >
          <template v-slot:prepend>
            <q-icon name="email" color="cyan" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          dark
          filled
          label="Password"
          type="password"
          color="cyan"
          class="glass-input"
          :rules="[
            (val) => !!val || 'Password is required',
            (val) => val.length >= 6 || 'Password needs 6+ chars',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="lock" color="cyan" />
          </template>
        </q-input>

        <div
          class="row justify-between items-center text-grey-4 text-caption q-mt-sm full-width"
          v-if="isLogin"
        >
          <q-checkbox v-model="rememberMe" label="Remember me" dark color="cyan" size="sm" />
          <a href="#" class="text-cyan user-select-none" style="text-decoration: none"
            >Forgot Password?</a
          >
        </div>

        <q-btn
          unelevated
          rounded
          :label="isLogin ? 'Login' : 'Register'"
          type="submit"
          class="full-width glow-btn q-mt-lg"
          size="lg"
          :loading="loading"
        />
      </q-form>

      <div class="q-mt-lg text-grey-5 text-caption">Or continue with</div>

      <div class="row q-gutter-md q-mt-sm justify-center">
        <q-btn round flat class="social-btn" @click="handleSocialLogin('google')">
          <q-avatar size="24px">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
            />
          </q-avatar>
        </q-btn>
        <q-btn round flat class="social-btn" @click="handleSocialLogin('facebook')">
          <q-avatar size="24px">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" />
          </q-avatar>
        </q-btn>
        <q-btn round flat class="social-btn" @click="handleSocialLogin('instagram')">
          <q-avatar size="24px">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
            />
          </q-avatar>
        </q-btn>
        <q-btn round flat class="social-btn" @click="handleSocialLogin('apple')">
          <q-avatar size="24px">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" />
          </q-avatar>
        </q-btn>
      </div>

      <div class="text-grey-4 q-mt-lg">
        {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
        <span class="text-cyan cursor-pointer text-weight-bold" @click="toggleAuthMode">
          {{ isLogin ? 'Register' : 'Login' }}
        </span>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/auth-store'

const $router = useRouter()
const $route = useRoute()
const $q = useQuasar()
const authStore = useAuthStore()

const isLogin = ref(true)

onMounted(() => {
  if ($route.query.mode === 'register') {
    isLogin.value = false
  }
})
const loading = ref(false)
const email = ref('')
const fullName = ref('')
const password = ref('')
const rememberMe = ref(false)

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
  // Reset form errors/state if needed
}

const onSubmit = async () => {
  loading.value = true
  try {
    if (isLogin.value) {
      await authStore.login(email.value, password.value)

      $q.notify({
        type: 'positive',
        message: 'Welcome back!',
        position: 'top',
      })
      $router.replace('/dashboard')
    } else {
      // Register Logic
      await authStore.register(email.value, password.value, {
        full_name: fullName.value,
      })

      $q.notify({
        type: 'positive',
        message: 'Registration successful! Please login with your password.',
        position: 'top',
        timeout: 5000,
      })

      // Refinement: switch to login mode, keep email, clear password
      isLogin.value = true
      password.value = ''
    }
  } catch (error) {
    console.error('Auth Error:', error)

    let msg = error.message || 'Authentication failed'

    // Provide friendlier messages for common errors
    if (error.message && error.message.includes('Invalid login credentials')) {
      msg = 'Invalid email or password. Please try again.'
    } else if (error.message && error.message.includes('User already registered')) {
      msg = 'This email is already registered. Please log in.'
    } else if (error.status === 422) {
      msg = 'Unable to register. Password might be too weak or email invalid.'
    }

    $q.notify({
      type: 'negative',
      message: msg,
      position: 'top',
    })
  } finally {
    loading.value = false
  }
}

const handleSocialLogin = async (provider) => {
  try {
    await authStore.socialLogin(provider)
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Social login error: ' + error.message,
      position: 'top',
    })
  }
}
</script>

<style scoped>
.login-page {
  background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #050505 100%);
}

.bg-particles {
  background-image: radial-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.3;
}

.glass-card {
  width: 100%;
  max-width: 450px;
  /* Other props inherited from global, just overriding size/padding if needed or relying on utility classes */
}

/* Override Quasar Input Styles for Glass Effect - REMOVED (Global) */

.social-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #00f3ff;
  border-color: #00f3ff;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
  transform: translateY(-2px);
}

.home-btn {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.home-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #00f3ff;
  color: #00f3ff;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
}
</style>
