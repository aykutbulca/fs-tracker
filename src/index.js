import React from 'react'
import { render } from 'react-dom'
//Import View Manager
import ViewManager from './app/view_manager';

// Since we are using HtmlWebpackPlugin WITHOUT a template
// we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

// Add id to root 'div'
root.id = 'root'

// Append 'root' div to the 'body' element
document.body.appendChild(root)

render(<ViewManager />, document.getElementById('root'));