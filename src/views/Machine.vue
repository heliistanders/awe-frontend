<template>
  <div class="machine">
      <h1>This is a machine page</h1>
      <ul v-if="machine">
          <li>Name: {{ machine.name }}</li>
          <li>Difficulty: {{ machine.difficulty }}</li>
          <li>Owned: {{ machine.owned }}</li>
          <li v-if="machine.owned">Owned on {{ new Date(machine.owned_at).toLocaleDateString() }}</li>
          <ul v-if="machine.ports">
              <li v-for="(port, index) in machine.ports" :key="port">Port{{index}} : {{port}}</li>
          </ul>
          <li>Status {{ machine.status }}</li>
      </ul>
      <input v-model="flag"><button v-on:click="sendFlag">Send</button>
  </div>
</template>

<script>
export default {
    name: "MachinePage",
    props: {
        name: String
    },
    data: function () {
        return {
            machine: null,
            flag: ""
        }
    },
    created() {
        this.fetchMachineDate()
    },
    methods: {
        async fetchMachineDate() {
            console.log(this.name)
            let res = await fetch('/machine/' + this.name)
            this.machine = await res.json();
        },
        async sendFlag(){
            let resp = await fetch("/solve", {
                method: "POST",
                body: JSON.stringify({
                    machineName: this.machine.image,
                    flag: this.flag
                }),
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            let x = await resp.text()
            console.log(x)
        }
    }
}
</script>

<style>
.machine {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

</style>