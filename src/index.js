import React from 'react'
import { render } from 'react-dom'
//Import View Manager
import ViewManager from './views/view_manager';

// Since we are using HtmlWebpackPlugin WITHOUT a template
// we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

// Add id to root 'div'
root.id = 'root'

// Append 'root' div to the 'body' element
document.body.appendChild(root)

//Disable default file navigation
document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())

render(<ViewManager />, document.getElementById('root'));