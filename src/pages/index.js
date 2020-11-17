import React from "react"
import { Link, navigate } from "gatsby"

import Layout from "../components/layout"
import { Image } from "../components/image"
import SEO from "../components/seo"
import { logout } from '../services/auth'
import NewDiagnosis from '../components/newDiagnosis'
import Slide from '@material-ui/core/Slide';

function __logout() {
  logout(() => navigate('/login'))
}
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

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Open full-screen dialog
      </Button>
      <NewDiagnosis />
    <Link to="/login/">Login</Link> <br />

    <p to="#" onClick={() => __logout()}>Logout</p>
  </Layout>
)

export default IndexPage
