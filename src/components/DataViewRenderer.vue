<template>
  <div class="flex px-4xs12">
    <v-btn @click="renderTemplate()" :loading="loading" class='mx-4'>{{ $t('$quartz.core.show') }}</v-btn>
    <div class="view" v-if="rendered">
      <iframe :src="'data:'+getFileTypeBasedOnResource()+';base64,' + rendered" height="600" type="text/html"/>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'

export default {
  props: [
    'resource',
    'manager'
  ],
  data () {
    return {
      loading: false,
      rendered: null,
      timeout: null,
    }
  },
  methods: {
    getFileTypeBasedOnResource () {
      return this.resource.filetype ? this.resource.filetype : 'text/html'
    },
    renderTemplate () {


      this.rendered = null;
      
      if (this.loading) {
        return;
      }

      this.loading = true;

      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {

        let params = _.merge(this.resource, {
          data_builder_id: this.resource.data_builder_id,
          data: this.$root.parseYaml(this.resource.data_builder.mock_data)
        });

        this.manager.manager.post('/render', params).then(response => {
          this.rendered = response.body.resource.body
        }).catch(response => {
          console.log(response);

          if (response.status === 400) {
            this.report.errors = response.body.errors
            return
          }

          window.bus.$emit("message", {
            message: response.body.errors[0].message,
            type: "error"
          });

        }).finally(() => {
          this.loading = false
        })
      }, 600)
    }
  }
}
</script>