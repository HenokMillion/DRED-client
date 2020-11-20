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


export default function PatientForm() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState('');
    const [filePath, setFilePath] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
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
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                <CenterFocusStrongOutlinedIcon /> Add Patient
            </Button>
            <Dialog fullWidth="md"
                maxWidth="lg" open={props.open ? props.open : open} onClose={handleClose} TransitionComponent={Transition}>
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
                                    <Grid container spacing={6}>
                                        <Grid xs={12} sm={12} >
                                            <h1>Patient Vital Information</h1>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="patientFirstName"
                                                label="First Name"
                                                helperText="e.g. Abebe"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="patientLastName"
                                                label="Last Name"
                                                helperText="e.g. Kebede"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="patientSex"
                                                select
                                                label="Sex"
                                                onChange={handleChange}
                                                helperText="Please select your sex"
                                            >
                                                <MenuItem key="Male" value="male">Male</MenuItem>
                                                <MenuItem key="Female" value="female">Female</MenuItem>
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
                                                id="patientEmail"
                                                label="Email"
                                                helperText="e.g. akebede@dred.io"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="patientAddress"
                                                label="Address"
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
                                                value={'PT'.concat(Date.now().toString())}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                helperText="e.g. PT123123"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="patientFileNo"
                                                label="File No"
                                                helperText="e.g. DRED_1234"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button color="success">Save</Button>
                                </form>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}
