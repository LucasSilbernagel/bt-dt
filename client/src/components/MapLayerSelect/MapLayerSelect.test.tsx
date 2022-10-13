import { render, screen, fireEvent } from '@testing-library/react'
import MapLayerSelect from './MapLayerSelect'

describe('MapLayerSelect', () => {
  test('renders', () => {
    const updateMapLayers = jest.fn()
    render(
      <MapLayerSelect
        mapLayers={['Cities', 'Attractions']}
        setMapLayers={updateMapLayers}
      />
    )
    expect(screen.getByTestId('map-layer-select')).toBeInTheDocument()
    expect(screen.getByLabelText('Map layers')).toBeInTheDocument()
    expect(screen.getByText('Cities')).toBeInTheDocument()
    expect(screen.getByText('Attractions')).toBeInTheDocument()
    expect(screen.getAllByTestId('CancelIcon')[0]).toBeInTheDocument()
    fireEvent.click(screen.getAllByTestId('CancelIcon')[0])
    expect(updateMapLayers).toHaveBeenCalled()
  })
})
