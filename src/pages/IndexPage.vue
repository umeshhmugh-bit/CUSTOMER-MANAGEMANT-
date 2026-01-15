<template>
  <q-page class="index-page overflow-hidden">
    <!-- Hero Section -->
    <section class="hero-section relative-position flex flex-center">
      <div class="mouse-follower" :style="followerStyle"></div>

      <div class="content-container z-top text-center q-px-md">
        <div class="badge-container q-mb-xl reveal-up">
          <div class="glass-badge row items-center no-wrap">
            <q-badge rounded color="cyan" class="q-mr-sm" />
            <span class="text-white text-weight-medium">Version 2.0 now live</span>
            <q-icon name="arrow_forward_ios" size="10px" class="q-ml-sm text-cyan" />
          </div>
        </div>

        <h1 class="text-h2 text-md-h1 text-weight-black text-white rubik reveal-up-1">
          The Next Gen <span class="text-gradient">Management</span><br />
          Experience Is Here
        </h1>

        <p class="text-grey-4 text-h6 text-weight-medium q-mt-lg max-w-600 mx-auto reveal-up-2">
          Streamline your company operations with UGManagement. The ultimate SaaS platform for
          forward-thinking teams.
        </p>

        <div class="row q-gutter-md justify-center q-mt-xl reveal-up-3">
          <q-btn
            unelevated
            rounded
            label="Login"
            class="glow-btn px-xl py-md"
            size="lg"
            :to="user ? '/dashboard' : '/login'"
          />
          <q-btn
            outline
            rounded
            label="Watch Demo"
            class="text-white border-glass px-xl py-md"
            size="lg"
          >
            <q-icon name="play_circle_outline" class="q-mr-sm" />
          </q-btn>
        </div>

        <!-- Interface Preview -->
        <div class="preview-container q-mt-100 reveal-up-4">
          <div class="glass-preview">
            <img
              src="https://cdn.pixabay.com/photo/2021/10/11/17/54/technology-6701504_1280.jpg"
              class="preview-img"
              alt="Dashboard Preview"
            />
            <div class="preview-overlay"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="features-section q-py-xl q-px-md">
      <div class="content-container">
        <div class="text-center q-mb-xl">
          <h2 class="text-h3 text-weight-bold text-white rubik q-mb-md">Powerful Core Features</h2>
          <p class="text-grey-5 text-subtitle1 mx-auto" style="max-width: 600px">
            Everything you need to manage your business from a single interface.
          </p>
        </div>

        <div class="row q-col-gutter-lg">
          <div v-for="(feature, idx) in features" :key="idx" class="col-12 col-sm-6 col-md-4">
            <div class="feature-card glass-card q-pa-xl column">
              <q-icon :name="feature.icon" :color="feature.color" size="48px" class="q-mb-md" />
              <div class="text-h5 text-weight-bold text-white q-mb-sm">{{ feature.title }}</div>
              <p class="text-grey-5">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth-store'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const mouseX = ref(0)
const mouseY = ref(0)

const features = [
  {
    icon: 'analytics',
    title: 'Advanced Analytics',
    desc: 'Real-time data processing with deep insights into your business performance.',
    color: 'cyan',
  },
  {
    icon: 'security',
    title: 'Enterprise Security',
    desc: 'Bank-grade encryption and advanced access controls for your data.',
    color: 'purple',
  },
  {
    icon: 'cloud_done',
    title: 'Cloud Infrastructure',
    desc: 'Highly available, redundant systems ensuring 99.9% uptime.',
    color: 'blue',
  },
  {
    icon: 'sync',
    title: 'Auto Sync',
    desc: 'Seamlessly synchronize your data across all devices and platforms.',
    color: 'green',
  },
  {
    icon: 'bolt',
    title: 'High Performance',
    desc: 'Optimized engines designed for speed and lightning-fast interactions.',
    color: 'orange',
  },
  {
    icon: 'api',
    title: 'Powerful API',
    desc: 'Extensible API architecture for easy integration with your existing tools.',
    color: 'pink',
  },
]

const handleMouseMove = (e) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const followerStyle = computed(() => ({
  left: `${mouseX.value}px`,
  top: `${mouseY.value}px`,
}))

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.index-page {
  background: #050505;
}

.hero-section {
  min-height: 100vh;
  padding-top: 100px;
}

.mouse-follower {
  position: fixed;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0, 243, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 1;
  transition:
    width 0.3s,
    height 0.3s;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
}

.text-gradient {
  background: linear-gradient(45deg, #00f3ff, #bc13fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass-badge {
  display: inline-flex;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 0.9rem;
}

.max-w-600 {
  max-width: 600px;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.q-mt-100 {
  margin-top: 100px;
}

.preview-container {
  transform: perspective(1000px) rotateX(10deg);
  transition: transform 0.5s ease;
}

.preview-container:hover {
  transform: perspective(1000px) rotateX(5deg);
}

.glass-preview {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  padding: 10px;
  overflow: hidden;
  box-shadow: 0 50px 100px rgba(0, 243, 255, 0.1);
}

.preview-img {
  width: 100%;
  border-radius: 30px;
  display: block;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 50%, #050505 100%);
}

.feature-card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.feature-card:hover {
  transform: translateY(-15px) scale(1.02);
  border-color: rgba(0, 243, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 243, 255, 0.1);
}

.px-xl {
  padding-left: 48px;
  padding-right: 48px;
}
.py-md {
  padding-top: 12px;
  padding-bottom: 12px;
}
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Reveal Animations */
.reveal-up {
  animation: revealUp 0.8s ease forwards;
}
.reveal-up-1 {
  animation: revealUp 0.8s ease 0.1s forwards;
  opacity: 0;
}
.reveal-up-2 {
  animation: revealUp 0.8s ease 0.2s forwards;
  opacity: 0;
}
.reveal-up-3 {
  animation: revealUp 0.8s ease 0.3s forwards;
  opacity: 0;
}
.reveal-up-4 {
  animation: revealUp 0.8s ease 0.4s forwards;
  opacity: 0;
}

@keyframes revealUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
