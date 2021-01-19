import { createStore } from 'vuex'


export default createStore({
  state: {
    searchQuery: "",
    allowSearch: false,
    machines: [],
    globalLoading: false,
  },
  mutations: {
    search(state, query) {
      state.searchQuery = query;
    },
    setMachines(state, machines) {
      state.machines = machines;
    },
    setLoading(state, isLoading) {
      state.globalLoading = isLoading
    },
    allowSearch(state, value) {
      state.allowSearch = value
    }
  },
  actions: {
    async fetchMachines({ commit, state }) {
      state.globalLoading = true;
      let resp = await fetch('/machines')
      let machines = await resp.json()
      console.log('Machines', machines)
      commit('setMachines', machines)
      state.globalLoading = false;
    },
    async startMachine({ commit, state }, name) {
      state.globalLoading = true;
      let resp = await fetch('/start/' + name)
      let machines = await resp.json()
      console.log('start Machines', machines)
      commit('setMachines', machines)
      state.globalLoading = false;
    },
    async stopMachine({ commit, state }, name) {
      state.globalLoading = true;
      let resp = await fetch('/stop/' + name)
      let machines = await resp.json()
      console.log('stopped Machines', machines)
      commit('setMachines', machines)
      state.globalLoading = false;
    },
    async restartMachine({ commit, state }, name) {
      state.globalLoading = true;
      let resp = await fetch('/restart/' + name)
      let machines = await resp.json()
      console.log('restart Machines', machines)
      commit('setMachines', machines)
      state.globalLoading = false;
    },
    disableSearch({ commit }) {
      commit('allowSearch', false)
    },
    enableSearch({ commit }) {
      commit('allowSearch', true)
    }
  },
  modules: {
  }
})
