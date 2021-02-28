<template>
  <div class="home">
    <table class="m_table">
        <thead class="m_header">
            <tr class="m_header_row">
                <th class="m_header_name"> name </th>
                <th class="m_header_difficulty"> difficulty </th>
                <th class="m_header_owned"> owned </th>
                <th class="m_header_status"> status </th>
                <th class="m_header_actions"> actions </th>
            </tr>
        </thead>
        <tbody class="m_body">
            <tr class="m_row" v-for="m in filteredMachines" :key="m.id">
                <td class="m_name">
                  <!-- <router-link :to="'/machine/' + m.image">{{ m.name }}</router-link> -->
                  {{m.name}}
                  <span v-if="m.ports">
                    <a v-for="p in m.ports" :key="p" class="machine_link" :href="'http://localhost:' + p" target="blank"><i class="icon-ic_fluent_open_16_regular" ></i></a>
                  </span>
                </td>
                <td class="m_difficulty"> {{ m.difficulty }} </td>

                <td v-if="m.owned" class="m_owned"><i class=" icon-ic_fluent_checkmark_circle_24_regular" title="Owned"></i></td>
                <td v-else class="m_owned"><i class=" icon-ic_fluent_dismiss_circle_24_regular" title="Not Owned"></i></td>
                <td class="m_status"><span> {{ m.status }} </span></td>
                <td class="m_actions">
                    <a v-if="m.status == 'not running'" v-on:click="startMachine($event, m.image)" title="Start Machine">
                        <i class=" icon-ic_fluent_play_circle_24_regular"></i>
                    </a>
                    <span v-else>
                      <a v-on:click="restartMachine($event, m.image)" title="Reset Machine">
                          <i class=" icon-ic_fluent_arrow_sync_circle_24_regular"></i>
                      </a>
                      <a v-on:click="stopMachine($event, m.image)" title="Stop Machine" >
                          <i class=" icon-ic_fluent_dismiss_circle_24_regular"></i>
                      </a>
                    </span>
                    <a v-on:click="hintMachine($event, m)" v-if="m.hint" title="Hint">
                        <i class=" icon-ic_fluent_lightbulb_circle_24_regular"></i>
                    </a>
                    <a v-on:click="solveMachine($event, m.name)" v-if="!m.owned && m.status != 'not running'" title="Solve">
                        <i class=" icon-ic_fluent_flag_28_regular"></i>
                    </a>
                    <router-link :to="'/terminal/' + m.image" v-if="m.owned && m.status != 'not running'" title="Open Terminal">
                      <i class="icon-ic_fluent_chevron_right_circle_24_regular"></i>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: 'Home',
  data: function() {
    return {
      loading: false
    }
  },
  beforeMount(){
    this.$store.dispatch('enableSearch')
  },
  created() {
    // this.$store.dispatch('fetchMachines')
  },
  computed: {
    ...mapState({
      machines: 'machines',
      searchQuery: 'searchQuery'
    }),
    filteredMachines() {
      if(this.searchQuery == ""){
        return this.machines;
      } else {
        return this.machines.filter(m => {
          let text = m.id+m.name+m.difficulty+m.status
          if (text.toLowerCase().includes(this.searchQuery.toLowerCase())){
            return true
          } else {
            return false
          }
        });
      }
    }
  },
  methods: {
    async startMachine(event, name) {
      this.$store.dispatch('startMachine', name);
    },
    restartMachine(event, name) {
      this.$store.dispatch('restartMachine', name);
    },
    stopMachine(event, name) {
      this.$store.dispatch('stopMachine', name);
    },
    hintMachine(event, machine) {alert(machine.hint)},
    solveMachine(event, machine) {
      this.$store.commit('setSolveMachine', machine)
      this.$store.commit('showSolve', true)
    },
  }
}
</script>


<style>
.home {
  padding: 40px 100px;
}

.m_table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

.m_header {
    border-bottom: 2px solid black;
    text-transform: capitalize;
}

.m_row {
    height: 40px;
}

.m_header_name, .m_name {
    text-align: left;
}

.m_owned {
}

.m_actions {
    font-size: 24px;
}

.m_actions a,a:visited,a:hover,a:link {
    color: black;
    text-decoration: none;
}

.icon-ic_fluent_dismiss_circle_24_regular:hover {
  color: #d4002d;
}

.icon-ic_fluent_play_circle_24_regular:hover {
  color: #42b983;
}

.icon-ic_fluent_arrow_sync_circle_24_regular:hover {
  color: #f7a600;
}

.icon-ic_fluent_lightbulb_circle_24_regular:hover {
  color: #00afcb;
}

.icon-ic_fluent_flag_28_regular:hover {
  color: #af1280;
}


.machine_link {
  margin-left: 10px;
  transform: translateY(120px);
}

i {
  font-size: 24px;
    color: rgba(0, 0, 0, .64);
}

i:before {
  vertical-align: middle;
}

.icon-ic_fluent_checkmark_circle_24_regular {
  color :#42b983;
}

.icon-ic_fluent_chevron_right_circle_24_regular:hover {
  color: #000;
}

</style>