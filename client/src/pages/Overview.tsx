import { SetStateAction, Dispatch } from 'react'
import { ICity, AttractionsInCities } from '../types'
import CityMap from '../components/CityMap/CityMap'
import Search from '../components/Search/Search'

interface OverviewProps {
  searchedCity: ICity | null
  setSearchedCity: Dispatch<SetStateAction<ICity | null>>
  attractionsInCities: AttractionsInCities
}

const Overview = (props: OverviewProps) => {
  const { searchedCity, setSearchedCity, attractionsInCities } = props

  return (
    <>
      <Search searchedCity={searchedCity} setSearchedCity={setSearchedCity} />
      <CityMap attractionsInCities={attractionsInCities} />
    </>
  )
}

export default Overview
