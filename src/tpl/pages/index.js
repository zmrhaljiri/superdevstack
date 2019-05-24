// Example of index page

import React from 'react'

import RenderPage from 'tpl/render'

import { DefaultLayout } from 'tpl/layouts/'
import SVG from 'tpl/components/SVG'
import Mario from 'img/jpg/mario.jpg'

const pageParams = {
    title: 'Homepage',
}

const Page = () => (
    <div>
        <p>Example of background SVG image</p>
        <div className="svg-test-icon-bg" />

        <p>Example of inline SVG image</p>
        <SVG className="svg-test-icon" name="icon-pointer" />

        <p>Example of normal image</p>
        <img src={Mario} alt="" />

        <p>Example of Vanilla JS component</p>
        <a href="#test" className="js-anchor">
            Click me
        </a>

        <p>Example of React component</p>
        <div id="app" />
    </div>
)

export default RenderPage(DefaultLayout, pageParams, Page)
