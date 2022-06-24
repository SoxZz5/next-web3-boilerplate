import { ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#f8460a',
    },
    secondary: {
      main: '#78dbc7',
    },
    background: {
      default: '#202227',
      paper: '#4c4d50',
    },
    error: {
      main: '#d0021b',
    },
    warning: {
      main: '#ff7501',
    },
    info: {
      main: '#78dbc7',
    },
    success: {
      main: '#7ed321',
    },
  },
  typography: {},
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          boxShadow: 'none',
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '9999',
          color: 'white',
        },
      },
    },
  },
};

export default lightThemeOptions;
