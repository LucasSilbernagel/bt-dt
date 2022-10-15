import { ComponentStory, ComponentMeta } from '@storybook/react'
import App from '.'
import { ApolloProvider } from '@apollo/client'
import { client } from '../apollo/client'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'App/App',
  component: App,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = (args) => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App {...args} />
    </ApolloProvider>
  </BrowserRouter>
)

export const Default = Template.bind({})
Default.args = {
  citiesWithAttractions: [],
  setCitiesWithAttractions: () => null,
  setSearchedCity: () => null,
}
