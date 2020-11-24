import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"

// import "assets/scss/material-kit-react.scss";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import LoginPage from "./views/LoginPage/LoginPage";
import { logout } from '../services/auth'
import NewDiagnosis from '../components/newDiagnosis'
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

export default function IndexPage() {
  let __logout = () => { }
  useEffect(() => {
    __logout = (e) => {
      logout(() => navigate('/login'))
    }
  })
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/login/">Login</Link> <br />
      <Link to="/patient/">Patient</Link> <br />

      <p to="#" onClick={(e) => __logout(e)}>Logout</p>
    </Layout>
  )
}
