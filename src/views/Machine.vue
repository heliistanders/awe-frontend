<template>
  <div class="machine">
      <h1>This is a machine page</h1>
      <ul>
          <li>{{ id }}</li>
          <li>{{ name }}</li>
          <li>{{ difficulty }}</li>
          <li>{{ owned }}</li>
          <li>{{ status }}</li>
      </ul>
  </div>
</template>

<script>
export default {
    name: "MachinePage",
    props: {
        id: String
    },
    data: function () {
        return {
            name: "",
            difficulty: "",
            owned: false,
            status: "owned"
        }
    },
    created() {
        this.fetchMachineDate()
    },
    methods: {
        async fetchMachineDate() {
            console.log(this.id)
            let res = await fetch('/machine/' + this.id)
            let machine = await res.json();
            //this.machine = machine[0];
            // console.log(machine)
            //this.id = machine.id;
            this.name = machine[0].name;
            this.difficulty = machine[0].difficulty;
            this.owned = machine[0].owned;
            this.status = machine[0].status;
        }
    }
}
</script>

<style>

</style>