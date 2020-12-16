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
import { Divider, Grid, Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DiagnosisCard from '../components/diagnosisCard';
import { match } from '@reach/router/lib/utils';
import { fetchPatientDataById } from '../services/api.service'
import CircularProgress from '@material-ui/core/CircularProgress';
import { formatDate, months } from '../utils/time.util'
import PatientForm from "../components/patientForm";
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import {
    curveCatmullRom,
    line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

const Line = props => (
    <LineSeries.Path
        {...props}
        path={line()
            .x(({ arg }) => arg)
            .y(({ val }) => val)
            .curve(curveCatmullRom)}
    />
);

let chartData = [{ date: 'Nov 2019', severity: "no DR" },
{ date: 'Dec 2019', severity: 'no DR' },
{ date: 'Mar 2020', severity: 'Acute' },
{ date: 'Jul 2020', severity: 'Chronic' },
{ date: 'Aug 2020', severity: 'Chronic' },
{ date: 'Oct 2020', severity: "Severe" }]

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
            flexDirection: 'row',
            fontFamily: ''
        },
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            overflow: 'scroll'
        },
        diagnosesContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '12px'
        },
        centeredFlexCol: {
            display: 'flex',
            flexDirection: 'col',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        },
        patientDetailContainer: {
            padding: '12px',
            marginRight: '12px'
        },
        spaced: {
            paddingRight: '10%',
        },
        subtitle: {
            color: 'blue',
            margin: '10px 0'
        },
        divider: {
            margin: '15px 0 5px 0'
        },
        actionsContainer: {
            marginTop: 40
        },
        historyContainer: {
            marginTop: 40,
            padding: '12px'
        },
        centered: {
            minHeight: '30vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
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
        setPatientData(null)
        fetchPatientDataById(params.id)
            .then(data => {
                setPatientData(data)
            })
            .catch(err => console.error('ERR: ', err))
        setOpen(false);
    };

    const handleEditClose = () => {
        setOpenEdit(!openEdit)
    }

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const [open, setOpen] = React.useState({});
    const [openEdit, setOpenEdit] = React.useState(false);
    const [patientData, setPatientData] = React.useState(null);

    const formatDate = (date) => {
    }

    const formatDateMY = date => {
        date = new Date(date)
        return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`
    }

    useEffect(() => {
        if (patientData === null) {
            fetchPatientDataById(params.id)
                .then(data => {
                    chartData = []
                    data.diagnoses.map(diagnosis => {
                        chartData.push({ date: formatDateMY(diagnosis.diagnosis_date), severity: diagnosis.severity })
                    })
                    setPatientData(data)
                })
                .catch(err => console.error('ERR: ', err))
        }
    })

    return (
        <Layout>
            {patientData ?
                <Grid container xs={12} className={classes.layout}>
                    <Grid item xs={3}>
                        <Paper elevation={2} className={classes.patientDetailContainer}>
                            <Grid container xs={12} className={classes.centeredFlexCol}>
                                <Grid item xs={12}>
                                    <AccountCircleIcon />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">{patientData.firstName} {patientData.lastName}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" className={classes.subtitle}>information</Typography>
                                </Grid>
                                <Grid container className={classes.layout}>
                                    <Grid container justify="space-between">
                                        <Grid item><Typography variant="body2">Birth Date</Typography></Grid>
                                        <Grid item><Typography variant="body2"><b>{patientData.birthDate}</b></Typography></Grid>
                                    </Grid>
                                    <Grid container justify="space-between">
                                        <Grid item><Typography variant="body2">Gender</Typography></Grid>
                                        <Grid item><Typography variant="body2"><b>{patientData.sex ? patientData.sex : 'Male'}</b></Typography></Grid>
                                    </Grid>
                                    <Grid container justify="space-between">
                                        <Grid item><Typography variant="body2">Phone</Typography></Grid>
                                        <Grid item><Typography variant="body2"><b>{patientData.phone}</b></Typography></Grid>
                                    </Grid>
                                    <Grid container justify="space-between">
                                        <Grid item><Typography variant="body2">Email</Typography></Grid>
                                        <Grid item><Typography variant="body2"><b>{patientData.email}</b></Typography></Grid>
                                    </Grid>
                                    <Grid container justify="space-between">
                                        <Grid item><Typography variant="body2">Address</Typography></Grid>
                                        <Grid item><Typography variant="body2"><b>{patientData.address}</b></Typography></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" className={classes.subtitle}>Medical Record</Typography>
                                </Grid>
                                <Grid container className={classes.layout}>
                                    <Grid container>
                                        <Grid container justify="space-between">
                                            <Grid item><Typography variant="body2">File Number</Typography></Grid>
                                            <Grid item><Typography variant="body2"><b>{patientData.fileNumber}</b></Typography></Grid>
                                        </Grid>
                                        <Grid container justify="space-between">
                                            <Grid item><Typography variant="body2">Patient ID</Typography></Grid>
                                            <Grid item><Typography variant="body2"><b>{patientData.patientId}</b></Typography></Grid>
                                        </Grid>
                                        <Grid container justify="space-between">
                                            <Grid item><Typography variant="body2">DR Status</Typography></Grid>
                                            <Grid item><Typography variant="body2"><b>{
                                                patientData.diagnoses ?
                                                    patientData.diagnoses[patientData.diagnoses.length - 1] ?
                                                        patientData.diagnoses[patientData.diagnoses.length - 1].comment ?
                                                            patientData.diagnoses[patientData.diagnoses.length - 1].comment[0] ?
                                                                patientData.diagnoses[patientData.diagnoses.length - 1].comment[0].severity
                                                                : '-' : '-' : '-' : '-'}</b>
                                            </Typography></Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid container>
                                <Grid container>
                                    <Typography variant="subtitle2" className={classes.subtitle}>Appointment</Typography>
                                </Grid>
                                <Grid container justify="space-between">
                                    <Grid item><Typography variant="body2">Last Diagnosed</Typography></Grid>
                                    <Grid item><Typography variant="body2"><b>{patientData.diagnoses ?
                                        patientData.diagnoses[patientData.diagnoses.length - 1] ?
                                            formatDate(patientData.diagnoses[patientData.diagnoses.length - 1].diagnosis_date) : '-' : '-'}</b></Typography>
                                    </Grid>
                                </Grid>
                                <Grid container justify="space-between">
                                    <Grid item><Typography variant="body2">Next Appointment</Typography></Grid>
                                    <Grid item><Typography variant="body2"><b>Nov 13 2021</b></Typography></Grid>
                                </Grid>
                            </Grid>
                            {/* <Grid container className={classes.actionsContainer} justify="flex-end">
                                <Grid item>
                                    <Button aria-label="delete" onClick={handleEditClose}>
                                        <EditIcon /> Edit Record
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button aria-label="delete" color='secondary'>
                                        <DeleteIcon /> Delete Record
                                    </Button>
                                </Grid>
                            </Grid> */}
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <div>
                            <Paper elevation={2}>
                                <div className={classes.diagnosesContainer}>
                                    <Typography variant='h6'>Diagnoses</Typography>
                                    <NewDiagnosis patient={patientData} handleClosingTasks={handleClose} />
                                </div>
                                <div className={classes.row}>
                                    {
                                        patientData.diagnoses.map(diagnosis => (
                                            <DiagnosisCard key={diagnosis} diagnosis={diagnosis} />
                                        ))
                                    }
                                </div>
                            </Paper>
                            <Paper elevation={2} className={classes.historyContainer}>
                                <div>
                                    <Typography variant='h6'>History</Typography>
                                </div>
                                <div>
                                    {
                                        patientData &&
                                        <Chart
                                            data={chartData}>
                                            <ArgumentScale factory={scalePoint} />
                                            <ArgumentAxis />
                                            <ValueAxis />
                                            <LineSeries
                                                name="DR Status"
                                                valueField="severity"
                                                argumentField="date"
                                                seriesComponent={Line}
                                            />
                                        </Chart>
                                    }
                                </div>
                            </Paper>
                        </div>
                    </Grid>
                    {
                        openEdit && <PatientForm
                            open={openEdit}
                            setOpen={setOpenEdit}
                            showAddBtn={false}
                            selectedPatient={
                                { id: '12312321', paitentId: '1234', patientName: 'Aschalew Tamene', patientAge: 45, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() }
                            }
                            handleModalClose={handleEditClose} />
                    }
                </Grid>
                : <div className={classes.centered}><CircularProgress /></div>}</Layout>
    )

}