import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { Layout } from './layout'
import { GlobalStateProvider } from './state'

declare const Go: any;

const subDirectory = window.location.pathname
console.log("subDirectory ", subDirectory)

if (subDirectory !== '/') {
    console.log("setting wasmpath to: ",  subDirectory + "/tupelo.wasm")
    Go.setWasmPath(subDirectory + "/tupelo.wasm");
}

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout />
      </ThemeProvider>
    </GlobalStateProvider>
  );
}

export default App;
