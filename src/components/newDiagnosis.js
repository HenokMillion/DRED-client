import React from 'react';
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
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import CenterFocusStrongOutlinedIcon from '@material-ui/icons/CenterFocusStrongOutlined';
import * as apiService from '../services/api.service';

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
        position: 'relative'
    },
    loadingCover: {
        width: '100%', height: '100%',
        zIndex: '9', backgroundColor: '#e0e0e0', position: 'absolute', opacity: '.3'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NoDRRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" name="severity" {...props} />);
const MildDRRadio = withStyles({
    root: {
        color: orange[200],
        '&$checked': {
            color: orange[200],
        },
    },
    checked: {},
})((props) => <Radio color="default" name="severity" {...props} />);
const NonSevereDRRadio = withStyles({
    root: {
        color: orange[500],
        '&$checked': {
            color: orange[500],
        },
    },
    checked: {},
})((props) => <Radio color="default" name="severity" {...props} />);
const AcuteDRRadio = withStyles({
    root: {
        color: orange[800],
        '&$checked': {
            color: orange[800],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);
const SevereDRRadio = withStyles({
    root: {
        color: orange[900],
        '&$checked': {
            color: orange[900],
        },
    },
    checked: {},
})((props) => <Radio color="default" name="severity" {...props} />);
export default function NewDiagnosis() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [diagnosis, setDiagnosis] = React.useState({});
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [value, setValue] = React.useState('0');
    const [comment, setComment] = React.useState('');

    let file = null
    let doctorId = '5faa5d122de51f1cc15226bf'
    let patientId = '1234'
    let diagnosisResult = {}

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
        file = e.target.files[0]
    }

    const renderLoadingCover = () => {
        return !diagnosis.severity ? (
            <Paper className={classes.loadingCover}></Paper>
        ) : null
    }

    const diagnose = () => {
        apiService.saveDiagnosis(file, doctorId, patientId)
            .then(resp => {
                setDiagnosis(resp.data.data)
                console.log(diagnosis)
            })
    }

    const handleEditDiagnosis = () => {
        apiService.editDiagnosis(diagnosis._id, {
            patientId: diagnosis.patientId,
            diagnosisId: diagnosis.diagnosisId,
            comment: {
                doctorId: doctorId,
                severity: selectedValue,
                comment: comment,
                timestamp: new Date().getTime()
            }
        })
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                <CenterFocusStrongOutlinedIcon /> New Diagnosis
      </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            New Diagnosis
            </Typography>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Paper variant="outlined" square className={classes.fileInputContainer}>
                                <AddIcon /> <p>Add Retina Image</p>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={e => fileChangeHandler(e)}
                                />
                            </Paper>
                            <Button variant="contained" color="primary" onClick={diagnose}>Diagnose</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            { renderLoadingCover() }
                                <Typography variant="h6" component="h6">
                                    System Diagnosis Prediction
                                 </Typography>
                                {
                                    diagnosis.severity ? (
                                        <div>
                                            <Alert severity="success">No signs of DR</Alert>
                                            <p>{diagnosis.severity}</p>
                                        </div>
                                    ) : null
                                }
                                <br />
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Doctor's Judgement
                            </Typography>
                                <div>
                                    <RadioGroup aria-label="severity" name="severity" value={selectedValue} onChange={handleChange}>
                                        <FormControlLabel value="0" control={<NoDRRadio />} label="No DR" />
                                        <FormControlLabel value="1" control={<MildDRRadio />} label="Mild" />
                                        <FormControlLabel value="2" control={<NonSevereDRRadio />} label="..." />
                                        <FormControlLabel value="3" control={<AcuteDRRadio />} label="Acute" />
                                        <FormControlLabel value="4" control={<SevereDRRadio />} label="Severe" />
                                    </RadioGroup>
                                </div>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Comment"
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    variant="outlined"
                                    onInput={e => setComment(e.target.value)}
                                />
                                <div>
                                    <Button autoFocus color="inherit" onClick={handleClose}>
                                        cancel
                                </Button>
                                    <Button autoFocus variant="contained" color="primary" onClick={handleEditDiagnosis}>
                                        save
                                </Button>
                                </div>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}
