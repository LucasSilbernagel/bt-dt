import { AttractionsInCities, IAttraction, IAttractionsInCity } from '../types'
import {
  CircularProgress,
  Typography,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import cloneDeep from 'lodash.clonedeep'

interface CityProps {
  cityAttraction?: IAttractionsInCity
  loading: boolean
  attractionsInCities: IAttractionsInCity[]
  setAttractionsInCities: Dispatch<SetStateAction<AttractionsInCities | []>>
}

const City = (props: CityProps) => {
  const {
    cityAttraction,
    loading,
    attractionsInCities,
    setAttractionsInCities,
  } = props

  const [attractionList, setAttractionList] = useState<IAttraction[]>([])

  /** Get the list of attractions for the selected city */
  useEffect(() => {
    if (cityAttraction) {
      setAttractionList(cityAttraction.attractions)
    }
  }, [cityAttraction])

  /** Update the list of attractions for the selected city as they are checked or unchecked */
  useEffect(() => {
    if (attractionList.length > 0) {
      const newAttractionsInCities = cloneDeep(attractionsInCities)
      setAttractionsInCities(
        newAttractionsInCities.map((attractionInCity) => {
          return {
            ...attractionInCity,
            attractions:
              attractionInCity.city.placeId === cityAttraction?.city.placeId
                ? attractionList
                : attractionInCity.attractions,
          }
        })
      )
    }
  }, [attractionList])

  const handleCheckbox = (selectedAttractionName: string) => {
    const newAttractionList = cloneDeep(attractionList)
    setAttractionList(
      newAttractionList.map((attraction) => {
        return {
          ...attraction,
          isVisited:
            attraction.formattedName === selectedAttractionName
              ? !attraction.isVisited
              : attraction.isVisited,
        }
      })
    )
  }

  if (loading) {
    return <CircularProgress size={80} />
  } else {
    return (
      <>
        <Typography variant="h2">
          {cityAttraction?.city.formattedName}
        </Typography>
        <List>
          {attractionList.map((attraction, index) => {
            return (
              <ListItem key={index}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={attraction.formattedName}
                  onChange={() => handleCheckbox(attraction.formattedName)}
                  id={`attraction-${index}`}
                  checked={attraction.isVisited}
                />
              </ListItem>
            )
          })}
        </List>
      </>
    )
  }
}

export default City
