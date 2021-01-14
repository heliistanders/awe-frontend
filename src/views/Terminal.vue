<template>
  <div class="terminal">
    <h1>Terminal: {{ name }}</h1>
    <pre id="terminal">
          $ _
      </pre
    >
  </div>
</template>

<script>
export default {
  name: "TerminalPage",
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