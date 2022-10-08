import { Box, Button, Grid, Modal, Typography } from '@mui/material'

interface ConfirmModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  handleConfirm: () => void
  confirmMessage: string
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const { isModalOpen, handleCloseModal, handleConfirm, confirmMessage } = props

  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '350px',
    borderRadius: '5px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2">
          {confirmMessage}
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: '0.5em' }}
        >
          <Grid item>
            <Button onClick={handleCloseModal} variant="outlined">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleConfirm}>
              Yes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ConfirmModal
