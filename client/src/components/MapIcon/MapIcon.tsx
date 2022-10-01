import AcUnitIcon from '@mui/icons-material/AcUnit'

interface MapIconProps {
  handleClick: () => void
  handleKeydown: (e: { key: string }) => void
}

const MapIcon = (props: MapIconProps) => {
  const { handleClick, handleKeydown } = props

  return (
    <AcUnitIcon
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => handleKeydown(e)}
    />
  )
}

export default MapIcon
