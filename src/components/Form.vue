<template>
  <div>
    <div v-if="errors.length !== 0" class='alert alert-danger'>
      <div v-for="error in errors">
        - {{ error.message }}
      </div>
    </div>

    <div v-for="attr,name in $root.parseYaml(dataBuilder.input)"  class="form-group">
        <v-text-field v-if="attr.type === 'text'" :label="name" v-model="form[name]"></v-text-field>
        <v-text-field v-if="attr.type === 'integer' || attr.type === 'int'" :label="name" v-model="form[name]"></v-text-field>
        <v-textarea v-if="attr.type === 'textarea'" :label="name" v-model="form[name]"></v-textarea>
        <v-select v-if="attr.type === 'enum'" :label="name" v-model="form[name]" :items="attr.options"></v-select>

        <div v-if="attr.type === 'date'">
          <v-menu
            :close-on-content-click="false"
            v-model="menu[name]"
            full-width
            min-width="290px"
          >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-on="on"
              v-model="form[name]"
              :label="name"
              clearable
              readonly
            ></v-text-field>
          </template>
            <v-date-picker
              v-model="form[name]"
              @change="menu[name] = false"
            ></v-date-picker>
          </v-menu>
        </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
var yaml = require('js-yaml');

export default {
  props: ['dataBuilder', 'form', 'errors'],
  data() {
    return {
      menu: [],
    }
  },
}
</script>
