<template>
  <div>
    <router-view :config="config"></router-view>
  </div>
</template>
<script>

import work from '../../app/Managers/WorkManager'

export default {
  data () {
    return {
      config: work
    }
  }
}
</script>
