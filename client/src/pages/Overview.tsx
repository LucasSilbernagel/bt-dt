import { SetStateAction, Dispatch } from 'react'
import { ICity } from '../types'
import CityMap from '../components/CityMap/CityMap'
import Search from '../components/Search/Search'

interface OverviewProps {
  searchedCity: ICity | null
  setSearchedCity: Dispatch<SetStateAction<ICity | null>>
}

const Overview = (props: OverviewProps) => {
  const { searchedCity, setSearchedCity } = props

  return (
    <>
      <Search searchedCity={searchedCity} setSearchedCity={setSearchedCity} />
      <CityMap />
    </>
  )
}

export default Overview
