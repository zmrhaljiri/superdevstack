// Example of testing React component

import React from 'react'
import { render } from 'react-testing-library'

import App from './'

describe('App', () => {
    it('Renders without errors', () => {
        render(<App />)
    })
})
