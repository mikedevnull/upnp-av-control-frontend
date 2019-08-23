<template>
  <div>
    <h3>Mediaservers</h3>
    <ol v-for="server in available_servers" :key="server.udn">
      <li><a href="#" @click="selectServer(server)">{{server.name}}</a></li>
    </ol>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
  }),
  methods: {
    selectServer: function(device) {
      this.$emit('onSelectMediaserver', device)
    },
  },
  computed: {...mapState(['available_servers']),
  }
};
</script>
