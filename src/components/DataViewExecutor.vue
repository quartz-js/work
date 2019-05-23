<template>
  <div class="c" v-if="resource">
    <v-dialog v-model="showDialog" width="500">
      <slot name='activator' slot="activator">
        <v-btn color="primary" flat icon class='ma-0 mx-1' small><v-icon size=19>fas fa-upload</v-icon></v-btn>
      </slot>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{ $t('$quartz.work.executor.title')}}</v-card-title>
        <data-builder-form class='content' :dataBuilder="resource.data_builder" :form="report.form" :errors="report.errors" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary @click="generate(report.form)">{{ $t('$quartz.work.executor.action') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import DataBuilderForm from './Form'

export default {
  props: [
    'resource',
    'manager'
  ],
  components: {
    DataBuilderForm
  },
  data () {
    return {
      showDialog: false,
      report: {
        errors: [],
        form: {}
      },
    }
  },
  mounted () {
    if (this.form) {
      this.report.form = this.form
    }
  },
  methods: {
    generate (data) {
      this.report.errors = []
      console.log(this.manager)

      this.manager.manager.post('/' + this.resource.id + '/execute', { data: data })
        .then(response => {

          window.bus.$emit("message", {
            message: "Your request has been sent",
            type: "info"
          });
        })
        .catch(response => {
          if (response.status === 400) {
            this.report.errors = response.body.errors
            return
          }

          window.bus.$emit("message", {
            message: response.body.errors[0].message,
            type: "error"
          });

        }).finally(response => {
          this.showDialog = false
        })
    }

  }
}
</script>
<style scoped>
  .c {
    display: inline-block;
  }
</style>