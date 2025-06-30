import { Box, Typography, Paper } from '@mui/material';

const NoMoviesFound = () => {
  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 4, 
        textAlign: 'center', 
        maxWidth: 400, 
        margin: 'auto', 
        mt: 6,
        backgroundColor: '#f9f9f9',
        borderRadius: 2 
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography variant="h6" fontWeight={500}>
          No movies were found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your filters or check back later.
        </Typography>
      </Box>
    </Paper>
  );
}

export default NoMoviesFound