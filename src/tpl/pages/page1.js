// Example of another page

import React from 'react'

import RenderPage from 'tpl/render'

import { DefaultLayout } from 'tpl/layouts/'

const pageParams = {
    title: 'Page 1',
}

const Page = () => <div>Page 1</div>

export default RenderPage(DefaultLayout, pageParams, Page)
