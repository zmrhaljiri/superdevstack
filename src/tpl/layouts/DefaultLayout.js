// Example of layout template

import React from 'react'

import Header from 'tpl/components/Header'
import Footer from 'tpl/components/Footer'

const DefaultLayout = (Page, pageParams) => (
    <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <title>{pageParams.title}</title>
        </head>
        <body>
            <Header />

            <main>
                <Page />
            </main>

            <Footer />
        </body>
    </html>
)

export default DefaultLayout
