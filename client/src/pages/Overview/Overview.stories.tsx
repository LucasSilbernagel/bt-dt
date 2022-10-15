import { ComponentStory, ComponentMeta } from '@storybook/react'
import Overview from '.'
import { mockCitiesWithAttractions } from '../../mockData'
import { ApolloProvider } from '@apollo/client'
import { client } from '../../apollo/client'

export default {
  title: 'Pages/Overview',
  component: Overview,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Overview>

const Template: ComponentStory<typeof Overview> = (args) => (
  <ApolloProvider client={client}>
    <Overview {...args} />
  </ApolloProvider>
)

export const NoCities = Template.bind({})
NoCities.args = {
  citiesWithAttractions: [],
  setCitiesWithAttractions: () => null,
  setSearchedCity: () => null,
}

export const Cities = Template.bind({})
Cities.args = {
  ...NoCities.args,
  citiesWithAttractions: mockCitiesWithAttractions,
}
