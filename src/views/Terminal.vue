<template>
  <div class="terminal">
    <h1>Terminal: {{ name }}</h1>
    <div id="terminal" ref="terminal"></div>
  </div>
</template>

<script>
import 'xterm/css/xterm.css'
import { Terminal } from "xterm";
export default {
  name: "TerminalPage",
  mounted() {
    let term = new Terminal({});
    term.open(this.$refs.terminal);
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
    term.focus()
    term.onData((data) => {
      console.log(data)
      term.write(data)
    })
  },
  props: {
    name: String,
  },
  data: function () {
    return {
      machine: null,
    };
  },
  methods: {},
};
</script>

<style>
.terminal {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#terminal {
  min-width: 700px;
  min-height: 500px;
  background: #000000;
  color: #ffffff;
  display: inline-block;
  padding: 10px;
  text-align: left;
}
</style>