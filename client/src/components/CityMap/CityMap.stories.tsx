import { ComponentStory, ComponentMeta } from '@storybook/react'
import CityMap from '.'
import { DEFAULT_MAP_VIEWPORT } from '../../constants'
import { mockCitiesWithAttractions } from '../../mockData'

export default {
  title: 'Components/CityMap',
  component: CityMap,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CityMap>

const Template: ComponentStory<typeof CityMap> = (args) => <CityMap {...args} />

export const Default = Template.bind({})
Default.args = {
  citiesWithAttractions: mockCitiesWithAttractions,
  cityFilter: '',
  setMapViewport: () => null,
  mapLayers: ['cities', 'attractions'],
  mapViewport: DEFAULT_MAP_VIEWPORT,
}
