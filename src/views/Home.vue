<template>
  <div class="home">
    <table class="m_table">
        <thead class="m_header">
            <tr class="m_header_row">
                <th class="m_header_name">{{ languageStrings.name[language] }}</th>
                <th class="m_header_difficulty">{{ languageStrings.difficulty[language] }}</th>
                <th class="m_header_owned">{{ languageStrings.owned[language] }}</th>
                <th class="m_header_status">{{ languageStrings.status[language] }}</th>
                <th class="m_header_actions">{{ languageStrings.actions[language] }}</th>
            </tr>
        </thead>
        <tbody class="m_body">
            <tr class="m_row" v-for="m in filteredMachines" :key="m.id">
                <td class="m_name"><router-link :to="'/machine/' + m.image">{{m.name}}</router-link>
                  <span v-if="m.status == 'running'">
                    <a v-for="p in m.ports" :key="p" class="machine_link" :href="'http://localhost:' + p" target="blank"><i class="icon-ic_fluent_open_16_regular" ></i></a>
                  </span>
                </td>
                <td class="m_difficulty">{{ languageStrings.difficulties[m.difficulty.toLowerCase()][language] }}</td>

                <td v-if="m.owned" class="m_owned"><i class=" icon-ic_fluent_checkmark_circle_24_regular"></i></td>
                <td v-else class="m_owned"><i class=" icon-ic_fluent_dismiss_circle_24_regular"></i></td>
                <td class="m_status"><span>{{ languageStrings.statusCodes[m.status.toLowerCase()][language] }}</span></td>
                <td class="m_actions">
                    <a v-if="m.status == 'stopped'" v-on:click="startMachine($event, m.image)">
                        <i class=" icon-ic_fluent_play_circle_24_regular"></i>
                    </a>
                    <span v-else>
                      <a v-on:click="restartMachine($event, m.image)">
                          <i class=" icon-ic_fluent_arrow_sync_circle_24_regular"></i>
                      </a>
                      <a v-on:click="stopMachine($event, m.image)">
                          <i class=" icon-ic_fluent_dismiss_circle_24_regular"></i>
                      </a>
                    </span>
                    <a v-on:click="hintMachine($event, m.image)">
                        <i class=" icon-ic_fluent_lightbulb_circle_24_regular"></i>
                    </a>
                    <a v-on:click="helpMachine($event, m.image)">
                        <i class=" icon-ic_fluent_question_circle_24_regular"></i>
                    </a>
                    <router-link :to="'/terminal/' + m.name" v-if="m.owned">
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
  created() {
    this.$store.dispatch('fetchMachines')
  },
  computed: {
    ...mapState({
      machines: 'machines',
      language: 'language',
      languageStrings: 'languageStrings',
      searchQuery: 'searchQuery'
    }),
    filteredMachines() {
      if(this.searchQuery == ""){
        return this.machines;
      } else {
        return this.machines.filter(m => {
          let text = m.id+m.name+m.difficulty+m.status
          console.log(text.toLowerCase())
          console.log(this.searchQuery.toLowerCase())
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
    fetchMachines() {
      fetch('/machines').then(e =>e.json()).then(e => this.machines = e)
      //console.log(machines)
    },
    async startMachine(event, name) {
      this.$store.dispatch('startMachine', name);
    },
    restartMachine(event, name) {
      this.$store.dispatch('restartMachine', name);
    },
    stopMachine(event, name) {
      this.$store.dispatch('stopMachine', name);
    },
    hintMachine(event, id) {console.log(event.target, id)},
    helpMachine(event, id) {console.log(event.target, id)},
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

.icon-ic_fluent_question_circle_24_regular:hover {
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

</style>