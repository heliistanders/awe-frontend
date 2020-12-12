<template>
  <div class="home">
    <table class="m_table">
        <thead class="m_header">
            <tr class="m_header_row">
                <th class="m_header_name">Name</th>
                <th class="m_header_difficulty">Difficulty</th>
                <th class="m_header_owned">Owned</th>
                <th class="m_header_status">Status</th>
                <th class="m_header_actions">Actions</th>
            </tr>
        </thead>
        <tbody class="m_body">
            <tr class="m_row" v-for="m in machines" :key="m.id">
                <td class="m_name">{{m.name}}</td>
                <td class="m_difficulty">{{m.difficulty}}</td>

                <td v-if="m.owned" class="m_owned"><i class=" icon-ic_fluent_checkmark_circle_24_regular" id="search"></i></td>
                <td v-else class="m_owned"><i class=" icon-ic_fluent_dismiss_circle_24_regular" id="search"></i></td>
                <td class="m_status"><span>{{m.status}}</span></td>
                <td class="m_actions">
                    <a v-if="m.status == 'stopped'" href="/start/{{m.id}}">
                        <i class=" icon-ic_fluent_play_circle_24_regular"></i>
                    </a>
                    <span v-else>
                      <a href="/restart/{{m.id}}">
                          <i class=" icon-ic_fluent_arrow_sync_circle_24_regular"></i>
                      </a>
                      <a href="/stop/{{m.id}}">
                          <i class=" icon-ic_fluent_dismiss_circle_24_regular"></i>
                      </a>
                    </span>
                    <a href="/hint/{{m.id}}">
                        <i class=" icon-ic_fluent_lightbulb_circle_24_regular"></i>
                    </a>
                    <a href="/help/{{m.id}}">
                        <i class=" icon-ic_fluent_question_circle_24_regular"></i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  data: function() {
    return {
      machines: [
        {"id": 1,"name": "Deserialization", "difficulty": "Easy", "owned": true, "status": "stopped"},
        {"id": 2,"name": "Server Side Template Injection", "difficulty": "Hard", "owned": false, "status": "running"},
      ]
    }
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
}

.m_row {
    height: 40px;
}

.m_header_name, .m_name {
    text-align: left;
}

.m_owned {
    vertical-align: bottom;
}

.m_actions {
    vertical-align: bottom;
    font-size: 24px;
}

.m_actions a,a:visited,a:hover,a:link {
    color: black;
    text-decoration: none;
}

i:hover {
  color: red;
}
</style>