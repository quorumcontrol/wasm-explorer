import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import {Layout} from './layout'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout/>
    </ThemeProvider>
  );
}

export default App;
