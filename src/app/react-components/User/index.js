// Example of React class component

import React from 'react'
import PropTypes from 'prop-types'

class User extends React.Component {
    render() {
        const { name } = this.props

        return <p>Hello, {name}</p>
    }
}

export default User

User.propTypes = {
    name: PropTypes.string.isRequired,
}
