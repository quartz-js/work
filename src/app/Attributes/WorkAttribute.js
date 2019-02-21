import { Attributes } from '@railken/quartz-core'
import { WorkApi } from './../Api/WorkApi'

export class WorkAttribute extends Attributes.BelongsTo {
  constructor (name, options) {
    super(name, new WorkApi())

    this.resourceConfig = () => { return require('./../Managers/WorkManager').default };

    this.createComponent = {
      component: () => import('../../components/work/Resource/create')
    }

    this.updateComponent = {
      component: () => import('../../components/work/Resource/edit')
    }
  }
};
