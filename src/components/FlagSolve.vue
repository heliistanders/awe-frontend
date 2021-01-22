<template>
  <div class="flag_solve_wrapper" v-on:click="hide" ref="form">
    <div class="flag_solve">
      <h1>{{machine}}</h1>
      <label for="flag">Flag:</label>
      <input type="text" name="flag" id="flag" v-model="flag">
      <button v-on:click="submitFlag()">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlagSolve',
  props: {
    machine: String
  },
  data() {
    return {
      flag: ''
    }
  },
  methods: {
    submitFlag(){
      this.$store.dispatch('submitFlag', this.flag)
      setTimeout(() => {
        this.$store.commit('showSolve', false)
      }, 2000)
    },
    hide(event) {
      if(event.target != this.$refs.form){
        return
      }
      console.log(event)
      this.$store.commit('showSolve', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flag_solve_wrapper {
  display: flex;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flexbox;
  justify-content: center;
  align-items: center;
}

.flag_solve {
  border-radius: 5px;
  padding: 20px 10px;
  min-width: 200px;
  /* height: 500px; */
  background: #fff;
  display:flex;
  flex-direction: column;
}

button {
  margin-top: 20px;
}
</style>
