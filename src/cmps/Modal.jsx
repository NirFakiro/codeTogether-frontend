import Typography from '@mui/material/Typography'
import MaterialModal from '@mui/material/Modal'
import { Box } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const Modal = ({ modalContent, setModalContent }) => {
  return (
    <MaterialModal
      open={!!modalContent}
      onClose={() => setModalContent()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalContent}
        </Typography>
      </Box>
    </MaterialModal>
  )
}
