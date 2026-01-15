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

    <!-- Authenticatiing Overlay -->
    <transition name="fade">
      <div v-if="authenticating" class="absolute-full z-max transition-overlay flex flex-center">
        <div class="column items-center">
          <q-spinner-tail color="cyan" size="4em" />
          <div class="text-h6 text-white text-weight-light q-mt-md tracking-widest uppercase">
            Authenticating
          </div>
        </div>
      </div>
    </transition>

    <div class="glass-card q-pa-xl column items-center z-top shadow-24">
      <div class="text-h4 text-weight-bold text-white q-mb-md rubik text-center">
        {{ isLogin ? 'Sign In' : 'Create Account' }}
      </div>
      <div class="text-subtitle1 text-grey-4 q-mb-xl text-center">
        {{
          isLogin
            ? 'Access your UGManagement enterprise suite'
            : 'Join the next generation of management'
        }}
      </div>

      <!-- Direct Form View (Success State View removed per user request) -->
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
          :label="isLogin ? 'Sign In' : 'Register Now'"
          type="submit"
          class="full-width glow-btn q-mt-lg"
          size="lg"
          :loading="loading && !authenticating"
        />
      </q-form>

      <div class="q-mt-md full-width column items-center">
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
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
              />
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
          {{ isLogin ? 'New to UGManagement?' : 'Already using our platform?' }}
          <span
            class="text-cyan cursor-pointer text-weight-bold hover-underline"
            @click="toggleAuthMode"
          >
            {{ isLogin ? 'Create an Account' : 'Sign In' }}
          </span>
        </div>
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
const authenticating = ref(false)
const email = ref('')
const fullName = ref('')
const password = ref('')
const rememberMe = ref(false)

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
}

const onSubmit = async () => {
  loading.value = true
  try {
    if (isLogin.value) {
      await authStore.login(email.value, password.value)

      authenticating.value = true

      // Artificial delay for smooth transition feel
      await new Promise((resolve) => setTimeout(resolve, 1500))

      $q.notify({
        type: 'positive',
        message: 'Success! Welcome back to the dashboard.',
        position: 'top',
        timeout: 2000,
      })
      $router.replace('/dashboard')
    } else {
      // Register Logic
      await authStore.register(email.value, password.value, {
        full_name: fullName.value,
      })

      authenticating.value = true

      // Artificial delay for smooth transition feel
      await new Promise((resolve) => setTimeout(resolve, 1500))

      $q.notify({
        type: 'positive',
        message: 'Account registered and synchronized!',
        position: 'top',
        timeout: 2000,
      })
      $router.replace('/dashboard')
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
.hover-underline:hover {
  text-decoration: underline;
}

.transition-overlay {
  background: rgba(5, 5, 5, 0.9);
  backdrop-filter: blur(20px);
  z-index: 9999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.tracking-widest {
  letter-spacing: 0.3em;
}

.pulsating-btn {
  background: linear-gradient(45deg, #00f3ff, #00b4d8);
  color: white;
  font-weight: bold;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.4);
  animation: pulsate 1.5s infinite alternate;
  border: none;
  transition: all 0.3s ease;
}

@keyframes pulsate {
  0% {
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.4);
    transform: scale(1);
  }
  100% {
    box-shadow:
      0 0 35px rgba(0, 243, 255, 0.8),
      0 0 60px rgba(0, 243, 255, 0.3);
    transform: scale(1.03);
  }
}

.pulsating-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 10px 40px rgba(0, 243, 255, 0.6);
}
</style>
