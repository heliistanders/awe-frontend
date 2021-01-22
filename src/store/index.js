import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    searchQuery: "",
    allowSearch: false,
    machines: [],
    globalLoading: false,
    showSolve: false,
    solveMachine: '',
    solveResult: ''
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
    },
    showSolve(state, value) {
      state.showSolve = value
    },
    setSolveMachine(state, machine) {
      state.solveMachine = machine
    },
    setSolveResult(state, result) {
      state.solveResult = result
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
    },
    async submitFlag({commit}, flag) {
      let formData = new FormData()
      formData.append("flag", flag)
      try {
        let resp = await axios.post("/solve", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        let data = resp.data
        console.log(data)
        if(data == "OK") {
          commit('setSolveResult', "Right! Well done!")
          this.dispatch('fetchMachines')
        } else {
          throw new Error("Wrong Flag")
        }
      } catch(err) {
        commit('setSolveResult', "Wrong. Sorry!")
        console.error(err)
      }
    }
  },
  modules: {
  }
})
