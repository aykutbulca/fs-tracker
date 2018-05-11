// Import React
import React from 'react'

// Import React-dom
import { render } from 'react-dom'

// Import the main App component
import App from './app/App'

// Since we are using HtmlWebpackPlugin WITHOUT a template
// we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

// Add id to root 'div'
root.id = 'root'

// Append 'root' div to the 'body' element
document.body.appendChild(root)

// Render the main component of our electron application into the 'root' div
render(<App />, document.getElementById('root'))