'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

import CharVideoComponent from './CharVideoComponent'
import './style.css'

ReactDOM.render(
  <CharVideoComponent 
  	charWidth="100" 
  	charHeight="40" 
  	// ASCII characters used as pixels from least to most dense
  	charSet=".':;!lcodxOM"
  	// Milliseconds between frames 
  	frameInterval="50" 
  	src="giraffe.mp4" />,
  document.getElementById('root')
)
