import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: '123 Main St, City, Country',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '987-654-3210',
        address: '456 Oak Ave, City, Country',
      },
    ],
  }),

  getters: {
    getCustomers: (state) => state.customers,
  },

  actions: {
    addCustomer(customer) {
      const newId = this.customers.length > 0 ? Math.max(...this.customers.map((c) => c.id)) + 1 : 1
      this.customers.push({ ...customer, id: newId })
    },

    updateCustomer(updatedCustomer) {
      const index = this.customers.findIndex((c) => c.id === updatedCustomer.id)
      if (index !== -1) {
        this.customers[index] = { ...updatedCustomer }
      }
    },

    deleteCustomer(id) {
      this.customers = this.customers.filter((c) => c.id !== id)
    },
  },
})
