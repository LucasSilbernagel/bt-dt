/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

const typeDefs = gql`
  type City {
    formattedName: String!
    lon: Float!
    lat: Float!
    placeId: String!
  }
  type Attraction {
    formattedName: String!
    lon: Float!
    lat: Float!
  }
  type Query {
    cities(cityName: String!): [City]!
    attractions(placeId: String!): [Attraction]!
  }
`

const resolvers = {
  Query: {
    cities: async (_parent, args, _context, _info) => {
      const cities = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?apiKey=${process.env.GEOAPIFY_KEY}&city=${args.cityName}`
      )
      const formattedCities = cities.data.features.map((city) => {
        return {
          formattedName: city.properties.formatted,
          lon: city.properties.lon,
          lat: city.properties.lat,
          placeId: city.properties.place_id,
        }
      })
      return formattedCities
    },
    attractions: async (_parent, args, _context, _info) => {
      const attractions = await axios.get(
        `https://api.geoapify.com/v2/places?apiKey=${process.env.GEOAPIFY_KEY}&categories=tourism.attraction&conditions=named&lang=en&filter=place:${args.placeId}`
      )
      const formattedAttractions = attractions.data.features.map(
        (attraction) => {
          const formattedName = attraction.properties.formatted.split(',')[0]
          return {
            formattedName: formattedName,
            lon: attraction.properties.lon,
            lat: attraction.properties.lat,
          }
        }
      )
      return formattedAttractions
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))
