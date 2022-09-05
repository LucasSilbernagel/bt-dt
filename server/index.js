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
    type Query {
				cities(cityName: String!): [City]!
    }
`

const resolvers = {
    Query: {
				cities: async (_parent, args, _context, _info) => {
					try {
							const cities = await axios.get(`https://api.geoapify.com/v1/geocode/search?apiKey=${process.env.GEOAPIFY_KEY}&city=${args.cityName}`)
							const formattedCities = cities.data.features.map(city => {
								return {
									formattedName: city.properties.formatted,
									lon: city.properties.lon,
									lat: city.properties.lat,
									placeId: city.properties.place_id
								}
							})
							return formattedCities
					} catch (error) {
							throw error
					}
			},
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))
