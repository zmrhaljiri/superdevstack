// SVG component for rendering inline SVG

/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import propTypes from 'prop-types'

const SVG = ({ className, name }) => (
    // <img> tag will be transformed into <svg> by Webpack if "inline" attribute specified
    <img inline="" src={`src/img/svg/${name}.svg`} className={className} />
)

export default SVG

SVG.propTypes = {
    className: propTypes.string,
    name: propTypes.string.isRequired,
}
