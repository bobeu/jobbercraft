import React, { ReactNode } from 'react';
import darkScrollbar from '@mui/material/darkScrollbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
      }),
    },
  },
});

export const AppThemeProvider = (props: { children : ReactNode | string}) => {
  return (
    <ThemeProvider theme={theme}>
      { props.children }
    </ThemeProvider>

  )
}
