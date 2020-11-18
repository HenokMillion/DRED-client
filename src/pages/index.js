import React from "react";
import { Link } from "gatsby";

// import "assets/scss/material-kit-react.scss";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import LoginPage from "views/LoginPage/LoginPage";
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
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
    {/* <LoginPage /> */}
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image/>
    </div>
    <Link to="/login/">Login</Link> <br />
    <p to="#" onClick={() => __logout()}>Logout</p>
  </Layout>
);

export default IndexPage;
