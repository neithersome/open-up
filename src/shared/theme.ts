import { createTheme } from '@mui/material';

const theme = createTheme({
  shape: {
    borderRadius: 10,
  },
});

theme.components = {
  MuiPaper: {
    styleOverrides: {
      root: { padding: '20px 30px', borderRadius: theme.shape.borderRadius },
    },
  },
  MuiGrid: {
    defaultProps: {
      spacing: 2,
    },
  },
};

export default theme;
