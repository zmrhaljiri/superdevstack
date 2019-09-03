// Example of the main React component demonstrating certain functionalities
// - State manipulation
// - Lazyloading
// - Fetch API
// - Rendering images in JS
// - HMR

import React, { Suspense, lazy } from 'react'
import { hot } from 'react-hot-loader'

import star from 'img/svg/icon-star.svg'

// Lazy components

const Warning = lazy(() =>
    import(/* webpackChunkName: "Warning" */ 'react-components/Warning')
)
const User = lazy(() =>
    import(/* webpackChunkName: "User" */ 'react-components/User')
)

class App extends React.Component {
    state = {
        count: 0,
    }

    // Fetch API

    testFetchApi = () => {
        // GET | Star wars API
        fetch('https://swapi.co/api/people/1/')
            .then(response => response.json())
            .then(obj => {
                console.warn('Star Wars API GET', obj)
            })

        // GET | Local API
        fetch('/api/user')
            .then(response => response.json())
            .then(obj => {
                console.warn('Local API GET', obj)
            })

        // POST | Local API
        fetch('/api/userList', {
            method: 'POST',
        })
            .then(response => response.json())
            .then(obj => {
                console.warn('Local API POST', obj)
            })
    }

    // Basic state manipulation

    increment = () =>
        this.setState(state => ({
            count: state.count + 1,
        }))

    decrement = () =>
        this.setState(state => ({
            count: state.count - 1,
        }))

    render() {
        const { count } = this.state

        return (
            <>
                <h1>Hi, I am a React component.</h1>
                <p>
                    To lazy-load the component, increase the counter to value of
                    4.
                </p>
                <h2>{count}</h2>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
                <br />
                {/* Conditionally render the lazy component */}
                {count > 3 && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Warning name="Mario" />
                    </Suspense>
                )}{' '}
                <p>Example of rendering an image in React component</p>
                <img src={star} alt="ahoj" />
                <p>Test the fetch API</p>
                <button onClick={this.testFetchApi}>Test fetch API</button>
                <p>Rendering of functional React component</p>
                <Suspense fallback={<div>Loading...</div>}>
                    <User name="John" />
                </Suspense>
                <h2 className="font-test">
                    Test of heading with Eurostile font
                </h2>
                <p className="font-test">
                    Test of paragraph with Eurostile font
                </p>
            </>
        )
    }
}

export default hot(module)(App) // Use hot method to enable hot module replacement for the component
