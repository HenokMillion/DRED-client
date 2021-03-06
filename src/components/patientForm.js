import React from 'react';
import 'date-fns';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { green, orange } from '@material-ui/core/colors';
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
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import Alert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import CenterFocusStrongOutlinedIcon from '@material-ui/icons/CenterFocusStrongOutlined';
import * as apiService from '../services/api.service';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PaitentList from './paitentList';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        position: 'absolute',
        opacity: '0',
        width: '100%',
        top: '0',
        height: '100%',
        cursor: 'pointer'
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    fileInputContainer: {
        position: 'relative',
        height: '60%',
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '30px',
        marginBottom: '30px'
    },
    loadingCover: {
        width: '75%', height: '100%',
        zIndex: '9', backgroundColor: '#e0e0e0', position: 'absolute', opacity: '.3'
    },
    doctorArea: {
        paddingLeft: '10px',
        paddingTop: '30px !important'
    },
    imageArea: {
        paddingTop: '40px !important',
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    scanImage: {
        width: '100%',
        height: '100%',
    },
    flexColCentered: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    imageFab: {
        position: 'absolute',
        right: '10px',
        bottom: '10px',
        backgroundColor: 'white',
        borderRadius: '50%'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function PatientForm(props) {
    const classes = useStyles();
    let { open, setOpen, handleModalClose, showAddBtn } = props;
    const [file, setFile] = React.useState('');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    // const { selectedPatient } = React.useContext(PaitentList)
    const { selectedPatient } = props
    console.log('PROPS: ', props)
    const [patientSex, setpatientSex] = React.useState('');
    const [patientFName, setpatientFName] = React.useState('');
    const [patientLName, setpatientLName] = React.useState('');
    const [patientPhone, setpatientPhone] = React.useState('');
    const [patientEmail, setpatientEmail] = React.useState('');
    const [patientAddress, setpatientAddress] = React.useState('');
    const [filePath, setFilePath] = React.useState('');
    const [patientId, setpatientId] = React.useState('PT'.concat(Date.now().toString()));
    const [patientFileNumber, setpatientFileNumber] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [selectedValue, setSelectedValue] = React.useState(null);
    const [patient, setPatient] = React.useState(selectedPatient);
    const [success, setSuccess] = React.useState(false);

    const handleClickOpen = () => {
        handleModalClose()
    };

    const handleClose = () => {
        handleModalClose()
    };

    const handleChange = (event) => {
        setpatientSex(event.target.value);
    };

    const fileChangeHandler = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            var reader = new FileReader();
            reader.onload = function (_e) {
                setFilePath(_e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const savePatient = (patient) => {
        if (selectedPatient) {
            apiService.editPatient({
                'info': {
                    'patientId': patientId,
                    'firstName': patientFName,
                    'lastName': patientLName,
                    'birthDate': selectedDate,
                    'sex': patientSex,
                    'profilePicPath': '',
                    'email': patientEmail,
                    'phone': patientPhone,
                    'address': patientAddress,
                    'fileNumber': patientFileNumber,
                }
            })
                .then(resp => {
                    setSuccess(true)
                    setTimeout(() => {
                        handleModalClose()
                        setSuccess(false)
                    }, 3000)
                })
                .catch(err => console.error(err))
        } else {
            apiService.savePatient({
                'patientId': patientId,
                'firstName': patientFName,
                'lastName': patientLName,
                'birthDate': selectedDate,
                'sex': patientSex,
                'profilePicPath': '',
                'email': patientEmail,
                'phone': patientPhone,
                'address': patientAddress,
                'fileNumber': patientFileNumber,
            })
                .then(resp => {
                    setSuccess(true)
                    setTimeout(() => {
                        handleModalClose()
                        setSuccess(false)
                    }, 3000)
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <div>
            {
                showAddBtn &&
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    <CenterFocusStrongOutlinedIcon /> Add Patient
                </Button>
            }
            <Dialog fullWidth="md"
                maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            New Patient
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container className={classes.contentContainer}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={3} className={classes.imageArea}>
                            <Paper variant="outlined" square className={classes.fileInputContainer}>
                                {
                                    !file ? (
                                        <div className={classes.flexColCentered}>
                                            <AddIcon /> <p>Add Profile Photo</p>
                                        </div>
                                    ) : <img rounded className={classes.scanImage} src={filePath} />
                                }
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="scan-image"
                                    multiple
                                    type="file"
                                    onChange={e => fileChangeHandler(e)}
                                />
                                <label htmlFor="scan-image" className={classes.imageFab} hidden={!filePath}>
                                    <Paper elevation={3} style={{ borderRadius: '100%' }}>
                                        <IconButton color="primary" aria-label="upload scan image" component="span">
                                            <CenterFocusStrongOutlinedIcon />
                                        </IconButton>
                                    </Paper>
                                </label>
                            </Paper>
                            <Button variant="contained" color="primary" onClick={() => { }}>
                                <div>
                                    <span>Upload</span>
                                </div>
                            </Button>
                        </Grid>
                        <Grid container xs={12} sm={9} className={classes.doctorArea}>
                            <Container>
                                <form className={classes.root} noValidate autoComplete="off">
                                    <Grid container spacing={6} xs={12}>
                                        <Grid xs={12} sm={12} >
                                            <h1>Patient Vital Information</h1>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="patientFirstName"
                                                label="First Name"
                                                helperText="e.g. Abebe"
                                                onChange={e => setpatientFName(e.target.value)}
                                                defaultValue={selectedPatient ? selectedPatient.patientName.split(' ')[0] : ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="patientLastName"
                                                label="Last Name"
                                                helperText="e.g. Kebede"
                                                onChange={e => setpatientLName(e.target.value)}
                                                defaultValue={selectedPatient ? selectedPatient.patientName.split(' ')[1] : ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="patientSex"
                                                select
                                                label="Sex"
                                                onChange={handleChange}
                                                onChange={e => setpatientSex(e.target.value)}
                                                helperText="Please select your sex"
                                                defaultValue={selectedPatient ? selectedPatient.patientSex : ''}
                                            >
                                                <MenuItem selected={selectedPatient ? selectedPatient.patientSex === 'male' ? true : false : false} key="Male" value="male">Male</MenuItem>
                                                <MenuItem selected={selectedPatient ? selectedPatient.patientSex === 'female' ? true : false : false} key="Female" value="female">Female</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    fullWidt
                                                    disableToolbar
                                                    variant="inline"
                                                    format="mm/dd/yyyy"
                                                    margin="normal"
                                                    id="patientBirthDay"
                                                    label="Birthday"
                                                    value={selectedDate}
                                                    helperText="mm/dd/yyyy"
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="patientPhone"
                                                label="Phone"
                                                onChange={e => setpatientPhone(e.target.value)}
                                                defaultValue={selectedPatient ? selectedPatient.phone : ''}
                                                helperText="e.g. 0900000000"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="patientEmail"
                                                label="Email"
                                                onChange={e => setpatientEmail(e.target.value)}
                                                defaultValue={selectedPatient ? selectedPatient.email : ''}
                                                helperText="e.g. akebede@dred.io"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="patientAddress"
                                                label="Address"
                                                defaultValue={selectedPatient ? selectedPatient.address : ''}
                                                onChange={e => setpatientAddress(e.target.value)}
                                                helperText="e.g. Summit Bole, Addis Ababa, ET"
                                            />
                                        </Grid>
                                        <Grid xs={12} sm={12} >
                                            <h1>Patient File Information</h1>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="patientID"
                                                label="PatientID"
                                                disabled={true}
                                                value={selectedPatient ? selectedPatient.patientId : patientId}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={e => setpatientId(e.target.value)}
                                                helperText="e.g. PT123123"
                                                defaultValue={selectedPatient ? selectedPatient.patientId : ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                disabled={selectedPatient}
                                                id="patientFileNo"
                                                onChange={e => setpatientFileNumber(e.target.value)}
                                                defaultValue={selectedPatient ? selectedPatient.fileNumber : ''}
                                                label="File No"
                                                helperText="e.g. DRED_1234"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} justify="flex-end">
                                        <Grid item xs={12}>
                                            <Button onClick={savePatient} variant="contained" color="primary">Save</Button>
                                        </Grid>
                                        {
                                            success &&
                                            <Alert variant="filled" severity="success">
                                                Diagnosis saved successfully
                                                </Alert>
                                        }
                                    </Grid>
                                </form>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}
