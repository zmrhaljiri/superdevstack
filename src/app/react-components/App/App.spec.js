// Example of testing React component

import React from 'react'
import { render } from '@testing-library/react'

import App from './'

describe('App', () => {
    it('Renders without errors', () => {
        render(<App />)
    })
})
