import { ComponentStory, ComponentMeta } from '@storybook/react'
import MapIcon from '.'
import { mockCitiesWithAttractions } from '../../mockData'

export default {
  title: 'Components/MapIcon',
  component: MapIcon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MapIcon>

const Template: ComponentStory<typeof MapIcon> = (args) => <MapIcon {...args} />

export const City = Template.bind({})
City.args = {
  popupType: 'city',
  cityWithAttractions: mockCitiesWithAttractions[0],
  handleClick: () => null,
  handleMapMarkerKeydown: () => null,
}

export const Attraction = Template.bind({})
Attraction.args = {
  ...City.args,
  attraction: mockCitiesWithAttractions[0].attractions[0],
}
