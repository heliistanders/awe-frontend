<template>
<div class="loading" :class="{ remove: !globalLoading }">
    <img src="/img/loader.svg" alt="loading ...">
  </div>
  <nav>
        <router-link to="/"><img src="/img/logo.svg" alt="Home" id="logo"></router-link>
        <div class="nav_right">

            <!-- <div class="lang_block" v-on:click="toggleLanguage">
                <span class="lang_first" :class="{ chosenLanguage: language == 'de' }">DE</span> / <span class="lang_second" :class="{ chosenLanguage: language == 'en' }">EN</span>
            </div> -->
            <a class="search_block block" v-bind:class="{ disableSearch: !allowSearch }" v-on:click="toggleSearch">
                <i class=" icon-ic_fluent_search_24_regular" v-bind:class="{ disableSearch: !allowSearch }"></i>
                <div> Search </div>
            </a>
            <router-link to="/admin" class="settings_block block">
                <i class=" icon-ic_fluent_settings_24_regular" id="setting"></i>
                <div>Admin</div>
            </router-link>
        </div>
    </nav>
    <div :class="{ hideSearch: !allowSearch | hideSearch }" class="search_container">
      <input type="text" placeholder="Search ..." v-model="searchQuery" @input="search">
      <button class="search_close" v-on:click="closeSearch">X</button>
    </div>
  <router-view/>
  <flag-Solve :machine="solveMachine" v-if="showSolve"/>
</template>

<script>
import { mapState } from "vuex";
import FlagSolve from "./components/FlagSolve";

export default {
  name: "App",
  components: {
    FlagSolve
  },
  data () {
    return {
      hideSearch: true,
      //searchQuery: ""
    }
  },
  created(){
    this.$store.dispatch('fetchMachines')
  },
  computed: {
    ...mapState({
      globalLoading: 'globalLoading',
      searchQueryFromStore: 'searchQuery',
      allowSearch: 'allowSearch',
      solveMachine: 'solveMachine',
      showSolve: 'showSolve'
    }),
    searchQuery: {
      get() {
        return this.searchQueryFromStore;
      },
      set(value) {
        this.$store.commit('search', value);
      }
    },
  },
  methods: {
    toggleSearch() {
      if(!this.allowSearch){
        return
      }
      this.hideSearch = !this.hideSearch
    },
    search() {
      this.$store.commit('search', this.searchQuery)
    },
    closeSearch() {
      this.$store.commit('search', '')
      this.hideSearch = true;
    },
  }
}
</script>

<style>

*,
*::before,
*::after {
  box-sizing: border-box;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-grow: 0;
  padding: 0 80px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, .4);
  z-index: 100;
  background: #fff;
}


.nav_right button {
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  color: #2c3e50;
}

.nav_right button:active, .nav_right button:checked {
  border: none;
}

.nav_right {
    display: flex;
    justify-content: center;
    align-items: center;
}

.icon-ic_fluent_search_24_regular, #setting {
    font-size: 24px;
    color: rgba(0, 0, 0, .64);
}

.block {
  transition: transform .2s ease-out;
}

.block:hover {
  transform: scale(1.1);
}



.lang_block {
    width: 80px;
    font-size: 13px;
    text-align: center;
    vertical-align: bottom;
}

.lang_block:hover {
  font-size: 14px;
}

.lang_first {
    color: rgba(0, 0, 0, .56);
}

/* .lang_first:hover, .lang_second:hover {
    color: #76b82a;
} */

.lang_second {
    color: rgba(0, 0, 0, .56);
}

.chosenLanguage {
  color: rgba(0, 0, 0, 1);
  font-weight: bolder;
}

nav a {
    width: 134px;
}

#logo {
    height: 34px;
}

#nav img {
  height: 90%;
  width: auto;
}


#nav a:hover {
  background: black;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.search_block {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    font-size: 9px;
    color: rgba(0, 0, 0, .64);
    text-transform: uppercase;
}

.settings_block {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    font-size: 9px;
    color: rgba(0, 0, 0, .64);
    text-transform: uppercase;
}

.search_container {
  z-index: -1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background: #76b82a;
}

.search_container input {
  flex-grow: 1;
  max-width: 95%;
  max-height: 40px;
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
}

.hideSearch {
  display: none;
}

.search_close, .search_close:hover, .search_close:focus {
  border: none;
  background: none;
  color: #555;
  width: 40px;
  height: 40px;
}


.loading {
  z-index: 10000;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.4)
}

.remove {
  display: none;
}

.disableSearch, .disableSearch:hover {
  color: #ccc;
}
</style>
