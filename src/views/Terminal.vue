<template>
  <div class="terminal">
    <h1>Terminal: {{ name }}</h1>
    <div id="terminal" ref="terminal"></div>
  </div>
</template>

<script>
import 'xterm/css/xterm.css'
import { Terminal } from "xterm";
import { AttachAddon } from 'xterm-addon-attach'
export default {
  name: "TerminalPage",
  mounted() {
    let term = new Terminal({
      cursorBlink: true,
      cursorStyle: 'bar'
    });
    let url = ''
    // the development proxy is not working for websocket connections
    // so we're are switching the url depending on dev/prod mode
    if(process.env.NODE_ENV == 'development'){
      url = encodeURI('ws://' + 'localhost:5000' + '/terminals?name=' + this.name)
    } else {
      url = encodeURI('ws://' + window.location.host + '/terminals?name=' + this.name)
    }
    const socket = new WebSocket(url);
    let attachAddon = new AttachAddon(socket)
    term.loadAddon(attachAddon)
    term.open(this.$refs.terminal);
    term.focus()
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