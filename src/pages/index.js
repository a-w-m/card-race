import React from "react"
<<<<<<< HEAD
// import { Link } from "gatsby"

import Card from "../components/card"
// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

const IndexPage = () => (
  <div>
  <Card backgroundColor = "red"> Hi </Card>
  <Card backgroundColor = "blue">Bye</Card>
  <Card backgroundColor ="green">Okay</Card>
  </div>
=======
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
>>>>>>> f5613d6355d5f5bffd0ba982ebeeb97960681f20
)

export default IndexPage
