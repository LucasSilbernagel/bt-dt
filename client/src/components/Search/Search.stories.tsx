import { ApolloProvider } from '@apollo/client'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Search from '.'
import { mockCitiesWithAttractions } from '../../mockData'
import { client } from '../../apollo/client'

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Search>

const Template: ComponentStory<typeof Search> = (args) => (
  <ApolloProvider client={client}>
    <Search {...args} />
  </ApolloProvider>
)

export const Empty = Template.bind({})
Empty.args = {
  citiesWithAttractions: mockCitiesWithAttractions,
  setCityOptions: () => null,
  setSearchedCity: () => null,
  cityOptions: [],
}

export const HasOptions = Template.bind({})
HasOptions.args = {
  ...Empty.args,
  cityOptions: [
    mockCitiesWithAttractions[0].city,
    mockCitiesWithAttractions[1].city,
  ],
}
