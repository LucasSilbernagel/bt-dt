import { ComponentStory, ComponentMeta } from '@storybook/react'
import City from '.'
import { mockCitiesWithAttractions } from '../../mockData'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Pages/City',
  component: City,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof City>

const Template: ComponentStory<typeof City> = (args) => (
  <BrowserRouter>
    <City {...args} />
  </BrowserRouter>
)

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
  citiesWithAttractions: mockCitiesWithAttractions,
  setCitiesWithAttractions: () => null,
  setSearchedCity: () => null,
}

export const NoAttractions = Template.bind({})
NoAttractions.args = {
  ...Loading.args,
  loading: false,
}

export const Attractions = Template.bind({})
Attractions.args = {
  ...NoAttractions.args,
  city: mockCitiesWithAttractions[0],
}
