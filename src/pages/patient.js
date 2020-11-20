import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';

import Layout from "../components/layout"
import { Image } from "../components/image"
import SEO from "../components/seo"
import { logout } from '../services/auth'
import NewDiagnosis from '../components/newDiagnosis'
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DiagnosisCard from '../components/diagnosisCard';
import { match } from '@reach/router/lib/utils';
import { fetchPatientDataById } from '../services/api.service'
import CircularProgress from '@material-ui/core/CircularProgress';

const extractPageMatchParams = (props) => {
    if (props.pageContext.matchPath) {
        const result = match(props.pageContext.matchPath, props.location.pathname);
        if (result && result.params) {
            return result.params;
        }
    }
    // Empty make it easier to use in pages without having to check for null/undefined
    return {};
};

export default function PatientPage(props) {
    const params = extractPageMatchParams(props);
    const useStyles = makeStyles((theme) => ({
        layout: {
            display: 'flex',
            flexDirection: 'row'
        },
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
        row: {
            display: 'flex',
            flexDirection: 'row'
        },
        diagnosesContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    }))

    const classes = useStyles();

    const diagnoses = [1, 2, 3, 4]

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
    const [patientData, setPatientData] = React.useState(null);

    useEffect(() => {
        if (patientData === null) {
            fetchPatientDataById(params.id)
                .then(data => {
                    setPatientData(data)
                })
                .catch(err => console.error('ERR: ', err))
        }
    })

    return (
        <Layout>
            {patientData ?
                <div className={classes.layout}>
                    <Paper elevation={2}>
                        <div>
                            <AccountCircleIcon />
                            <p>{patientData.firstName} {patientData.lastName}</p>
                        </div>
                        <div>
                            <p>information</p>
                            <div className={classes.layout}>
                                <div>
                                    <p>Age</p>
                                    <p>Gender</p>
                                    <p>Phone</p>
                                    <p>Email</p>
                                    <p>Address</p>
                                </div>
                                <div>
                                    <p>{patientData.birthDate}</p>
                                    <p>{patientData.sex ? patientData.sex : 'Male'}</p>
                                    <p>{patientData.phone}</p>
                                    <p>{patientData.email}</p>
                                    <p>{patientData.address}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Medical Record</p>
                            <div className={classes.layout}>
                                <div>
                                    <p>File Number</p>
                                    <p>Patient ID</p>
                                    <p>DR Status</p>
                                </div>
                                <div>
                                    <p>{patientData.fileNumber}</p>
                                    <p>{patientData.patientId}</p>
                                    <p>{
                                    patientData.diagnoses ?
                                        patientData.diagnoses[patientData.diagnoses.length - 1].comment ?
                                        patientData.diagnoses[patientData.diagnoses.length - 1].comment[0].severity 
                                    : '-' : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Appointment</p>
                            <div>
                                <p>Last Diagnosed</p>
                                <p>Next Appointment</p>
                            </div>
                            <div>
                                <p>{ patientData.diagnoses ?
                                    patientData.diagnoses[patientData.diagnoses.length - 1].diagnosis_date : '-' }</p>
                                <p>Nov 13 2021</p>
                            </div>
                        </div>
                        <div>
                            <IconButton aria-label="delete">
                                <EditIcon /> Edit Record
                        </IconButton>
                            <IconButton aria-label="delete" color='secondary'>
                                <DeleteIcon /> Delete Record
                        </IconButton>
                        </div>
                    </Paper>
                    <div>
                        <Paper elevation={2}>
                            <div className={classes.diagnosesContainer}>
                                <Typography variant='h6'>Diagnoses</Typography>
                                <NewDiagnosis />
                            </div>
                            <div className={classes.row}>
                                {
                                    diagnoses.map(diagnosis => (
                                        <DiagnosisCard key={diagnosis} />
                                    ))
                                }
                            </div>
                        </Paper>
                        <Paper elevation={2}>
                            <Typography variant='h6'>History</Typography>
                        </Paper>
                    </div>
                </div>
                : <CircularProgress />}</Layout>
    )
}
