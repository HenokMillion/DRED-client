import React from "react"
import { Link, navigate } from "gatsby"

import Layout from "../components/layout"
import { Image } from "../components/image"
import SEO from "../components/seo"
import { logout } from '../services/auth'

function __logout() {
  logout(() => navigate('/login'))
}


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image/>
    </div>
    <Link to="/login/">Login</Link> <br />
    <p to="#" onClick={() => __logout()}>Logout</p>
  </Layout>
)

export default IndexPage
