import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const LoadingSpinner = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '8rem' }}>
      <CircularProgress color="inherit" />
    </Box>
  );

  export default LoadingSpinner