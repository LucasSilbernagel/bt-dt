import { useLazyQuery } from "@apollo/react-hooks"
import { gql } from '@apollo/client'
import { ChangeEvent, useState } from "react"

const GET_CITIES = gql`
query getCities($cityName: String!) {
  cities(cityName: $cityName) {
    formattedName
    lon
    lat
    placeId
  }
}
`

function App() {
  const [searchedCity, setSearchedCity] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedCity(e.target.value)
  }

  const [getCities, { loading, error, data }] = useLazyQuery(GET_CITIES, {variables: {cityName: 'Oliver'}})

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    getCities({variables: {cityName: searchedCity}})
  }

  if (error) return <h1>{`Error! ${error}`}</h1>
  if (loading) return <h1>Loading...</h1>

  return (
    <>
    {!data && <h1>Search for a city</h1>}
    <form onSubmit={handleSearch}><input type="text" onChange={(e)=> handleChange(e)} /><input type="submit" /></form>
    {data?.cities && <div>{data.cities.map((city: { formattedName: string; lon: number; lat: number; placeId: string; }, index: number) => {
      return (
        <div key={index} style={{marginBottom: '100px'}}><p>{city.formattedName}</p>
        <p>{city.lon}</p>
        <p>{city.lat}</p>
        <p>{city.placeId}</p></div>
      )
    })}</div>}
    </>
  )
}

export default App;
