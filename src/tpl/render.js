// Render React markup to static HTML

import ReactDOMServer from 'react-dom/server'

export default (Layout, pageParams, Page) => {
    const doctype = '<!DOCTYPE html>'
    const resultPage = ReactDOMServer.renderToStaticMarkup(
        Layout(Page, pageParams)
    )

    return `${doctype}${resultPage}`
}
