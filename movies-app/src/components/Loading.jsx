import { Box, CircularProgress, Typography, Paper } from '@mui/material';

const Loading = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        textAlign: 'center',
        maxWidth: 400,
        margin: 'auto',
        mt: 6,
        backgroundColor: '#fdfdfd',
        borderRadius: 2,
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <CircularProgress />
        <Typography variant="body1" fontWeight={500}>
          Loading movies...
        </Typography>
      </Box>
    </Paper>
  );
};

export default Loading
