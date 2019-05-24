// Example of React functional component

import React from 'react'
import PropTypes from 'prop-types'

import './warning.scss' // Importing styles in JS

const Warning = ({ name }) => (
    <span className="warning">
        Hi, my name is {name} and I have just been lazy-loaded!
    </span>
)

export default Warning

Warning.propTypes = {
    name: PropTypes.string.isRequired,
}
