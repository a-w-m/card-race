/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */


import React from "react"

//external conic-gradient script, adds conic-gradient support to Firefox

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script 
    key= "https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"
    src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"
    crossOrigin="anonymous"
    defer
    type ="text/javascript"
    />,
    <script 
    key="https://cdn.rawgit.com/LeaVerou/conic-gradient/609dc5f4/conic-gradient.js"
    src="https://cdn.rawgit.com/LeaVerou/conic-gradient/609dc5f4/conic-gradient.js"
    crossOrigin="anonymous"
    defer
    type ="text/javascript"/>
  ])
}




