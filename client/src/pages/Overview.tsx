import { SetStateAction, Dispatch } from 'react'
import { ICity, AttractionsInCities } from '../types'
import CityMap from '../components/CityMap/CityMap'
import Search from '../components/Search/Search'
import CityFilter from '../components/CityFilter/CityFilter'

interface OverviewProps {
  setSearchedCity: Dispatch<SetStateAction<ICity | null>>
  filteredAttractionsInCities: AttractionsInCities
  cityFilter: string | null
  setCityFilter: Dispatch<SetStateAction<string | null>>
}

const Overview = (props: OverviewProps) => {
  const {
    setSearchedCity,
    filteredAttractionsInCities,
    cityFilter,
    setCityFilter,
  } = props

  return (
    <>
      <Search
        setSearchedCity={setSearchedCity}
        filteredAttractionsInCities={filteredAttractionsInCities}
      />
      <CityMap
        filteredAttractionsInCities={filteredAttractionsInCities}
        cityFilter={cityFilter}
      />
      {filteredAttractionsInCities.length > 0 && (
        <CityFilter
          filteredAttractionsInCities={filteredAttractionsInCities}
          setCityFilter={setCityFilter}
        />
      )}
    </>
  )
}

export default Overview
