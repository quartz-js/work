import { ServiceProvider } from '@railken/quartz-core'
import { container } from '@railken/quartz-core'

export class WorkServiceProvider extends ServiceProvider {
  register() {

    this.addRoutes('app', require('./../../routes/work.js'))

    this.addData({
      name: 'work',
      icon: require('../../assets/work-icon.svg'),
      tags: ['system'],
      route: { name: 'works.index' },
    })

    this.addLang({
      'en': require('../../../lang/work/en.json'),
      'it': require('../../../lang/work/it.json')
    })
  }
}