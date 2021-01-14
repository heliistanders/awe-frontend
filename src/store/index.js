import { createStore } from 'vuex'


export default createStore({
  state: {
    searchQuery: "",
    machines: [],
    globalLoading: false,
    language: 'en',
    languageStrings: {
      name: {
        "en": "name",
        "de": "Name"
      },
      difficulty: {
        "en": "difficulty",
        "de": "Schwierigkeit"
      },
      owned: {
        "en": "owned",
        "de": "Geschafft"
      },
      status: {
        "en": "status",
        "de": "Status",
      },
      actions: {
        "en": "actions",
        "de": "Aktionen"
      },
      search: {
        "en": "search",
        "de": "Suche"
      },
      settings: {
        "en": "settings",
        "de": "Einstellungen"
      },
      difficulties: {
        easy: {
          "en": "easy",
          "de": "Einfach"
        },
        medium: {
          "en": "medium",
          "de": "Mittel"
        },
        hard: {
          "en": "hard",
          "de": "Schwer"
        },
        insane: {
          "en": "insane",
          "de": "Wahnsinn"
        }
      },
      statusCodes: {
        running: {
          "en": "running",
          "de": "aktiv"
        },
        stopped: {
          "en": "stopped",
          "de": "inaktiv"
        }
      }
    }
  },
  mutations: {
    search(state, query) {
      console.log("from store", query)
      state.searchQuery = query;
    },
    setMachines(state, machines) {
      state.machines = machines;
    },
    setLoading(state, isLoading) {
      state.globalLoading = isLoading
    },
    changeLanguage(state) {
      (state.language == 'de') ? state.language = 'en' : state.language =  'de'
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
    }
  },
  modules: {
  }
})
