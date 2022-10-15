import { ComponentStory, ComponentMeta } from '@storybook/react'
import CityFilter from '.'
import { mockCitiesWithAttractions } from '../../mockData'

export default {
  title: 'Components/CityFilter',
  component: CityFilter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CityFilter>

const Template: ComponentStory<typeof CityFilter> = (args) => (
  <CityFilter {...args} />
)

export const NotSelected = Template.bind({})
NotSelected.args = {
  citiesWithAttractions: mockCitiesWithAttractions,
  cityFilter: '',
  setCityFilter: () => null,
}

export const Selected = Template.bind({})
Selected.args = {
  ...NotSelected.args,
  cityFilter: 'Toronto, ON, Canada',
}
