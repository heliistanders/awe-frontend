<template>
  <div class="flag_solve_wrapper" v-on:click="hide" ref="form">
    <div class="flag_solve">
      <div class="close_wrapper">
        <button class="closeBtn" @click="close">X</button>
      </div>
      <h1>{{machine || 'Machine'}}</h1>
      
      <p v-if="showCorrectAnswer" class="right">{{solveResult}}</p>
      <p v-if="showWrongAnswer" class="wrong">{{solveResult}}</p>
      <label for="flag">Flag:</label>
      <input type="text" name="flag" id="flag" v-model="flag">
      <button v-on:click="submitFlag()">Submit</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
    },
    hide(event) {
      if(event.target != this.$refs.form){
        return
      }
      this.$store.commit('showSolve', false)
    },
    close(){
      this.$store.commit('showSolve', false)
    }
  },
  computed: {
    ...mapState({
      solveResult: 'solveResult',
      answerCorrect: 'answerCorrect',
      showAnswer: 'showAnswer'
    }),
    showCorrectAnswer() {
      return this.showAnswer && this.answerCorrect
    },
    showWrongAnswer() {
      return this.showAnswer && !this.answerCorrect
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
  position: relative;
}

button {
  margin-top: 20px;
}

.closeBtn {
  background: white;
  border: none;
  outline: none;
}

.close_wrapper {
  display: flex;
  flex-direction: row-reverse;
  height: 20px;
}

.right {
  color: green;
}

.wrong {
  color:red;
}
</style>
