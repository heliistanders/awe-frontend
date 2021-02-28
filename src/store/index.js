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
    solveResult: '',
    answerCorrect: null,
    showAnswer: false,
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
      if(!value){
        state.showAnswer = false
      }
    },
    setSolveMachine(state, machine) {
      state.solveMachine = machine
    },
    setSolveResult(state, result) {
      state.solveResult = result
    },
    setAnswerCorrect(state, result) {
      state.answerCorrect = result
    },
    showAnswer(state, result) {
      state.showAnswer = result
    }
  },
  actions: {
    async fetchMachines({ commit, state }) {
      state.globalLoading = true;
      let resp = await fetch('/machines')
      let machines = await resp.json()
      commit('setMachines', machines)
      state.globalLoading = false;
    },
    async startMachine({ commit, state }, name) {
      state.globalLoading = true;
      let resp = await fetch('/start/' + name)
      let machines = await resp.json()
      commit('setMachines', machines)
      state.globalLoading = false;
    },
    async stopMachine({ commit, state }, name) {
      state.globalLoading = true;
      let resp = await fetch('/stop/' + name)
      let machines = await resp.json()
      commit('setMachines', machines)
      state.globalLoading = false;
    },
    async restartMachine({ commit, state }, name) {
      state.globalLoading = true;
      let resp = await fetch('/restart/' + name)
      let machines = await resp.json()
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
        if(data == "OK" && resp.status == 200) {
          commit('setSolveResult', "Right! Well done!")
          commit('setAnswerCorrect', true)
          commit('showAnswer', true)
          this.dispatch('fetchMachines')
        } else {
          commit('setSolveResult', "Wrong Flag!")
          commit('setAnswerCorrect', false)
          commit('showAnswer', true)
        }
      } catch(err) {
          commit('setSolveResult', "Wrong Flag!")
          commit('setAnswerCorrect', false)
          commit('showAnswer', true)
        console.error(err)
      }
    },
  },
  modules: {
  }
})
