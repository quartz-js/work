import { WorkApi } from '../Api/WorkApi'
import { Attributes, Manager } from '@railken/quartz-core'
import { DataBuilderAttribute } from '@railken/quartz/data-builder/src/app/Attributes/DataBuilderAttribute'

export default new Manager({
  name: 'work',
  route: 'works',
  manager: new WorkApi(),
  icon: require('../../assets/work-icon.svg'),
  attributes: [
    new Attributes.Id(),
    new Attributes.Base('name'),
    new Attributes.Base('payload'),
    new DataBuilderAttribute('data_builder_id'),
    new Attributes.Base('data'),
    new Attributes.DateTime('created_at'),
    new Attributes.DateTime('updated_at')
  ]
})
