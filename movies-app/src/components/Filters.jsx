import React, { useState } from 'react';
import { Box, TextField, Slider, Typography, Checkbox, FormControl, InputLabel, MenuItem, ListItemText, Select, OutlinedInput } from '@mui/material';

const Filters = ({ titleFilter, setTitleFilter, selectedGenres, setSelectedGenres, priceRange, setPriceRange }) => {
  const MAX_PRICE = 5000
  const GENRES = ['adventures', 'horror', 'animation', 'heroes'];

  const handlePriceChange = (_, newValue) => {
    setPriceRange({ from: newValue[0], to: newValue[1] });
  };

  return (
    <Box display="flex" gap={3} p={2} width="500px">

      <TextField
        label="Search by Title"
        variant="outlined"
        value={titleFilter}
        onChange={(e) => setTitleFilter(e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="genre-select-label">Genre</InputLabel>
        <Select
          labelId="genre-select-label"
          multiple
          value={selectedGenres}
          input={<OutlinedInput label="Genre" />}
          renderValue={(selected) => selected.length + ' selected' }
        >
          {GENRES.map((genre) => (
            <MenuItem key={genre} value={genre}>
              <Checkbox 
                checked={selectedGenres.indexOf(genre) > -1}
                onClick={() => {
                    if (!selectedGenres.includes(genre)) setSelectedGenres(selectedGenres.concat([genre]))
                    else setSelectedGenres(
                      selectedGenres.filter(selectedGenre => selectedGenre !== genre)
                    )
                }}
              />
              <ListItemText primary={genre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box width={500}>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={[priceRange.from, priceRange.to]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={MAX_PRICE}
        />
      </Box>
    </Box>
  );
};

export default Filters;
