import { ServiceProvider } from '@railken/quartz-core'
import { container } from '@railken/quartz-core'

export class WorkServiceProvider extends ServiceProvider {
  register() {
    this.registerComponent("DataViewRenderer", require('../../components/DataViewRenderer').default)
    this.registerComponent("DataViewExecutor", require('../../components/DataViewExecutor').default)

    this.addLang({
      'en': require('../../../lang/en.json'),
      'it': require('../../../lang/it.json')
    })
  }
}