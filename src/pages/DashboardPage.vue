<script setup>
import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth-store'

const authStore = useAuthStore()

const firstName = computed(() => {
  const fullName = authStore.user?.user_metadata?.full_name || 'User'
  return fullName.split(' ')[0]
})

const stats = [
  {
    title: 'Total Capital',
    value: '$154,239',
    icon: 'account_balance',
    color: 'blue',
    trend: 14.2,
  },
  { title: 'Asset Cycle', value: '4,240', icon: 'rebase_edit', color: 'orange', trend: -1.8 },
  { title: 'User Engagement', value: '12,502', icon: 'query_stats', color: 'purple', trend: 9.3 },
  { title: 'Gross Growth', value: '$32,050', icon: 'insights', color: 'green', trend: 28.1 },
]
</script>

<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <!-- Welcome Section -->
      <div class="col-12 z-top">
        <div class="text-h4 text-weight-bold text-charcoal q-mb-sm rubik">
          Welcome back, {{ firstName }}
        </div>
        <div class="text-subtitle1 text-grey-7">
          Comprehensive overview of your enterprise performance and metrics.
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="col-xs-12 col-sm-6 col-md-3" v-for="stat in stats" :key="stat.title">
        <q-card class="antigravity-card q-pa-sm">
          <q-card-section class="row items-center no-wrap">
            <q-avatar
              :color="stat.color + '-1'"
              :text-color="stat.color"
              size="50px"
              font-size="24px"
            >
              <q-icon :name="stat.icon" />
            </q-avatar>
            <div class="q-ml-md">
              <div class="text-grey-7 text-caption text-uppercase text-weight-bold">
                {{ stat.title }}
              </div>
              <div class="text-h5 text-weight-bolder text-charcoal">{{ stat.value }}</div>
            </div>
            <q-space />
            <div class="column items-end">
              <q-chip
                dense
                :color="stat.trend > 0 ? 'green-1' : 'red-1'"
                :text-color="stat.trend > 0 ? 'green-8' : 'red-8'"
              >
                <q-icon
                  :name="stat.trend > 0 ? 'arrow_upward' : 'arrow_downward'"
                  size="10px"
                  class="q-mr-xs"
                />
                {{ Math.abs(stat.trend) }}%
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Main Chart Area -->
      <div class="col-12 col-md-8">
        <q-card class="antigravity-card fit column">
          <q-card-section>
            <div class="row items-center justify-between">
              <div class="text-h6 text-weight-bold text-charcoal">Revenue Analytics</div>
              <q-btn-dropdown flat label="This Week" color="grey-7" dense no-caps />
            </div>
          </q-card-section>

          <q-card-section class="col relative-position flex flex-center">
            <!-- Mock Chart Visualization -->
            <div
              class="full-width"
              style="
                height: 250px;
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                padding: 0 10px;
              "
            >
              <div
                v-for="h in [40, 60, 35, 80, 55, 90, 65]"
                :key="h"
                class="rounded-borders bg-slate-blue"
                :style="`width: 8%; height: ${h}%; opacity: 0.8; transition: all 0.5s ease; position: relative`"
              >
                <div
                  class="absolute-bottom full-width bg-soft-emerald"
                  :style="`height: ${h * 0.4}%; opacity: 0.9; border-radius: 0 0 4px 4px;`"
                ></div>
              </div>
            </div>
            <!-- Grid Lines Background -->
            <div
              class="absolute-full"
              style="
                z-index: -1;
                background-image: linear-gradient(#e0e0e0 1px, transparent 1px);
                background-size: 100% 50px;
              "
            ></div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Side Panel / Top Products -->
      <div class="col-12 col-md-4">
        <q-card
          class="antigravity-card fit bg-slate-blue text-white overflow-hidden relative-position"
        >
          <div class="absolute-right" style="top: -20px; right: -20px; opacity: 0.1">
            <q-icon name="shopping_bag" size="150px" />
          </div>
          <q-card-section>
            <div class="text-h6 text-weight-bold">Performance Leaders</div>
            <div class="text-subtitle2 text-grey-4">
              Top performing enterprise assets this period
            </div>
          </q-card-section>

          <q-list class="q-mt-md">
            <q-item v-for="n in 4" :key="n" class="q-mb-sm glass-item">
              <q-item-section avatar>
                <q-avatar square rounded>
                  <img :src="`https://cdn.quasar.dev/img/ecommerce-${n}.jpg`" />
                  <!-- Fallback will show empty if url invalid, but layout remains -->
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold">Premium Watch Series {{ n }}</q-item-label>
                <q-item-label caption class="text-grey-4">Luxury Accessories</q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="text-white text-weight-bold">$2,400</div>
              </q-item-section>
            </q-item>
          </q-list>

          <q-card-actions align="center" class="q-pt-lg">
            <q-btn flat label="View Advanced Reports" no-caps class="text-white" />
          </q-card-actions>
        </q-card>
      </div>

      <!-- Transaction Table -->
      <div class="col-12">
        <q-card class="antigravity-card">
          <q-card-section class="q-pb-none">
            <div class="text-h6 text-weight-bold text-charcoal">Recent Transactions</div>
          </q-card-section>

          <q-card-section>
            <q-markup-table flat :separator="'none'" class="bg-transparent text-charcoal">
              <thead>
                <tr>
                  <th class="text-left text-grey-7 uppercase tracking-wider text-caption">
                    Entity
                  </th>
                  <th class="text-left text-grey-7 uppercase tracking-wider text-caption">
                    Processing Date
                  </th>
                  <th class="text-left text-grey-7 uppercase tracking-wider text-caption">
                    Net Value
                  </th>
                  <th class="text-left text-grey-7 uppercase tracking-wider text-caption">
                    Operational Status
                  </th>
                  <th class="text-right text-grey-7 uppercase tracking-wider text-caption">
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in 5" :key="i">
                  <td class="row items-center q-gutter-x-md">
                    <q-avatar size="32px">
                      <img :src="`https://cdn.quasar.dev/img/avatar${i}.jpg`" />
                    </q-avatar>
                    <span class="text-weight-medium">User Name {{ i }}</span>
                  </td>
                  <td class="text-grey-7">Jan {{ 15 - i }}, 2026</td>
                  <td class="text-weight-bold">$12{{ i }}.00</td>
                  <td>
                    <q-badge
                      :color="i === 2 ? 'orange-1' : 'green-1'"
                      :text-color="i === 2 ? 'orange-9' : 'green-9'"
                      class="q-px-sm q-py-xs rounded-borders"
                    >
                      {{ i === 2 ? 'Pending' : 'Completed' }}
                    </q-badge>
                  </td>
                  <td class="text-right">
                    <q-btn flat round icon="more_vert" color="grey-6" dense />
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
/* Antigravity Styles */
.text-charcoal {
  color: #2d3436;
}
.bg-slate-blue {
  background: #5b6b8c;
}
.bg-soft-emerald {
  background: #55efc4;
}

.antigravity-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.06); /* Soft, deep shadow */
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.antigravity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 45px -10px rgba(0, 0, 0, 0.09); /* Hover lift */
}

/* Glass items for the dark card */
.glass-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s;
}
.glass-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.tracking-wider {
  letter-spacing: 0.1em;
}

.rubik {
  font-family: 'Rubik', sans-serif;
}
</style>
