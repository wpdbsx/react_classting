import React from 'react'
import { Reset } from 'styled-reset'


import './App.css'
import QuizView from './pages/QuizView';


const App: React.FC = () =>
(
  <>
    <Reset />
    <QuizView />
  </>
);



export default App;
