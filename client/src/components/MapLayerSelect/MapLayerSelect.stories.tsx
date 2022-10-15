import { ComponentStory, ComponentMeta } from '@storybook/react'
import MapLayerSelect from '.'

export default {
  title: 'Components/MapLayerSelect',
  component: MapLayerSelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MapLayerSelect>

const Template: ComponentStory<typeof MapLayerSelect> = (args) => (
  <MapLayerSelect {...args} />
)

export const Default = Template.bind({})
Default.args = {
  setMapLayers: () => null,
}
