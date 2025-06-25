import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button
} from '@mui/material';

import { transferMovie } from '../api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3
};

export default ({ onClose, selectedMovie, studios, updateMovies }) => {
  const [open, setOpen] = useState(true);
  const [selectedStudio, setSelectedStudio] = useState(null);

  const handleTransfer = () => {
    return transferMovie({ movieId: Number(selectedMovie.id), studioId: selectedStudio })
      .then(updateMovies)
      .then(onClose)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Select studio</Typography>
        <RadioGroup
          value={selectedStudio}
          onChange={(e) => setSelectedStudio(Number(e.target.value))}
        >
          {
            studios.map(studio => (
              <FormControlLabel key={studio.id} value={Number(studio.id)} control={<Radio />} label={studio.name} />
            ))
          }
        </RadioGroup>

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button onClick={onClose} sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button
            onClick={handleTransfer}
            disabled={!selectedStudio}
            sx={{ textTransform: 'none' }}
          >
            Transfer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
