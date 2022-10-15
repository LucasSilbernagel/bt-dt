import { ComponentStory, ComponentMeta } from '@storybook/react'
import MapLegend from '.'

export default {
  title: 'Components/MapLegend',
  component: MapLegend,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MapLegend>

const Template: ComponentStory<typeof MapLegend> = () => <MapLegend />

export const Default = Template.bind({})
