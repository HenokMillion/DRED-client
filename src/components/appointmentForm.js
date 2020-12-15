import React, { useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { CircularProgress, Container, Grid, TextField } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CheckOutlined } from "@material-ui/icons";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { searchPatients, saveAppointment, fetchAllPatients } from '../services/api.service'
import { getAuthUser } from "../services/auth";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    container: {
        padding: '30px 40px'
    },
    gridItem: {
        marginBottom: '30px'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppointmentForm(props) {
    const classes = useStyles();
    const { handleCloseModal, appointments, fetchAppointments,
        newDialogOpened, setNewDialoOpened, selectedPatient } = props
    const [open, setOpen] = React.useState(true);
    const [patientName, setPatientName] = React.useState(null);
    const [patient, setPatient] = React.useState(selectedPatient);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [savingAppointment, setSavingAppointment] = React.useState(false);
    const [appointmentDate, setAppointmentDate] = React.useState(null)
    const [patients, setPatients] = React.useState([])
    const [fetchedPatients, setFetchedPatients] = React.useState(false)
    // "yyyy-MM-ddThh:mm
    if (patient) {
        let dt = new Date(patient.appointmentDate)
        dt = `${dt.getUTCFullYear()}-${dt.getUTCMonth()}-${dt.getUTCDate()}T${dt.getUTCHours()}:${dt.getUTCMinutes() < 10 ? '0' + dt.getUTCMinutes() : dt.getUTCMinutes()}`
        patient.appointmentDate = dt
    }

    appointments.reduce((store, appointment) => {
        if (!store) { store = [] }
        if (store.indexOf(appointment.patientId) < 0) {
            // patients.push(appointment)
            return store.concat(appointment.patientId)
        } else {
            return store
        }
    }, [])

    const handleClose = () => {
        setOpen(false)
        fetchAppointments()
        setNewDialoOpened(false)
    }

    const fetchPatients = () => {
        fetchAllPatients()
            .then(resp => {
                resp.data.data.map(patient => {
                    let _ap = {}
                    _ap.patientName = patient.firstName + ' ' + patient.lastName
                    _ap.patientPhone = patient.phone
                    _ap.patientId = patient.patientId
                    _ap.patientFileNumber = patient.fileNumber
                    _ap.id = patient._id
                    patients.push(_ap)
                })
                setFetchedPatients(true)
            })
    }
    useEffect(() => {
        if (!fetchedPatients) {
            fetchPatients()
        }
    })


    const handleSaveAppointment = () => {
        setSavingAppointment(true)
        setTimeout(() => {
            patients.map(patient => {
                if (patient.patientName === patientName && !savingAppointment) {
                    setPatient(patient)
                    saveAppointment({
                        patientId: patient.patientId,
                        doctorId: getAuthUser().id,
                        appointmentDate: appointmentDate
                    })
                        .then((resp) => {
                            setSnackbarOpen(true)
                            setTimeout(() => handleClose(), 2000)
                        })
                        .finally(() => setSavingAppointment(false))
                }
            })
        }, 3000)
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Dialog fullWidth="md"
            maxWidth="sm" open={open || newDialogOpened} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        New Appointment
            </Typography>
                    <Button disabled={savingAppointment || snackbarOpen} autoFocus color="inherit" onClick={handleSaveAppointment}>
                        {
                            (!snackbarOpen) ?
                                (savingAppointment) ?
                                    <CircularProgress color="secondary" /> : <span>save</span>
                                :
                                <CheckOutlined />
                        }
                    </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid className={classes.container} container spacing={1} justify="space-between" xs={12}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Autocomplete
                            freeSolo
                            fullWidth
                            id="patient-name-auto-complete"
                            disableClearable
                            options={patients.map((_patient) => _patient.patientName)}
                            onChange={(e, patientName) => setPatientName(patientName)}
                            defaultValue={patient ? patient.patientName : null}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Patient"
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            defaultValue={patient ? patient.appointmentDate : null}
                            id="datetime-local"
                            label="Appointment on:"
                            type="datetime-local"
                            onChange={e => setAppointmentDate(new Date(e.target.value))}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity="success">
                            Appointment Saved Successfully!
                        </Alert>
                    </Snackbar>
                </Grid>
            </Container>
        </Dialog>
    )
}