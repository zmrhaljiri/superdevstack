// Example of another page

import React from 'react'

import RenderPage from 'tpl/render'

import { DefaultLayout } from 'tpl/layouts/'

const pageParams = {
    title: 'Page 2',
}

const Page = () => <div>Page 2</div>

export default RenderPage(DefaultLayout, pageParams, Page)
