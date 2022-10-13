import { render, screen, fireEvent } from '@testing-library/react'
import ConfirmModal from './ConfirmModal'

describe('ConfirmModal', () => {
  test('renders', () => {
    const handleConfirm = jest.fn()
    const handleCloseModal = jest.fn()
    render(
      <ConfirmModal
        isModalOpen={true}
        handleCloseModal={handleCloseModal}
        handleConfirm={handleConfirm}
        confirmMessage={'Are you sure you want to delete all saved data?'}
      />
    )
    expect(screen.getByTestId('confirm-modal')).toBeInTheDocument()
    expect(
      screen.getByText('Are you sure you want to delete all saved data?')
    ).toBeInTheDocument()
    expect(screen.getByTestId('cancel-button')).toBeInTheDocument()
    expect(screen.getByTestId('confirm-button')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('confirm-button'))
    expect(handleConfirm).toHaveBeenCalled()
    fireEvent.click(screen.getByTestId('cancel-button'))
    expect(handleCloseModal).toHaveBeenCalled()
  })
})
