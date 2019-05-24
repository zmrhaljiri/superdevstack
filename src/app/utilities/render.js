// Rendering React components

import React from 'react'
import ReactDOM from 'react-dom'

export default {
    single: (Component, container, props) => {
        try {
            if (container) {
                ReactDOM.render(<Component {...props} />, container)
            }
        } catch (e) {
            console.error(e)
        }
    },
    multiple: (Component, containers, props) => {
        try {
            return [...containers].forEach(container => {
                ReactDOM.render(<Component {...props} />, container)
            })
        } catch (e) {
            console.error(e)
        }
    },
}
