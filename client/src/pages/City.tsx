import { IAttractionsInCity } from '../types'

interface CityProps {
  cityAttraction?: IAttractionsInCity
}

const City = (props: CityProps) => {
  const { cityAttraction } = props
  return (
    <>
      <h2>{cityAttraction?.city.formattedName}</h2>
    </>
  )
}

export default City
