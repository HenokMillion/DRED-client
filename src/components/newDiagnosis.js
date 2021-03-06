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
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx'
import { CheckCircleOutline } from '@material-ui/icons';
import { getAuthUser } from '../services/auth';

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
        width: '100%', height: '100%',
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
    },
    dialogActions: {
        paddingBottom: 21,
        paddingTop: 12
    },
    rightActionBtnContainer: {
        marginLeft: 21
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
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
export default function NewDiagnosis(props) {
    const { handleClosingTasks, patient } = props
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [diagnosis, setDiagnosis] = React.useState({});
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [value, setValue] = React.useState('0');
    const [comment, setComment] = React.useState('');
    const [file, setFile] = React.useState('');
    const [filePath, setFilePath] = React.useState('');
    const [diagnosing, setDiagnosing] = React.useState(false);
    const [editingDiagnosis, setEditingDiagnosis] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [diagnosisSuccess, setDiagnosisSuccess] = React.useState(false);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    let doctorId = getAuthUser().id
    let diagnosisResult = {}

    const handleClickOpen = () => {
        setDiagnosis({})
        setSelectedValue('a')
        setComment('')
        setFilePath('')
        // setDiagnosis(false)
        // setEditingDiagnosis(false)
        setDiagnosisSuccess(false)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleClosingTasks()
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const fileChangeHandler = (e) => {
        if (e.target.files && e.target.files.length > 0 && !diagnosing) {
            setFile(e.target.files[0])
            var reader = new FileReader();
            reader.onload = function (_e) {
                setFilePath(_e.target.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const renderLoadingCover = () => {
        return diagnosing ? (
            <CircularProgress size={24} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -12,
                marginLeft: -12
            }} />
            // <div className={classes.loadingCover}>
            // </div>
        ) : null
    }

    const renderNoDiagnosis = () => {
        return !diagnosis.severity || diagnosing ? (
            <Paper className={classes.loadingCover}></Paper>
        ) : null
    }

    const diagnose = () => {
        setDiagnosing(true)
        setTimeout(() => {
            apiService.saveDiagnosis(file, doctorId, patient.patientId)
                .then(resp => {
                    setDiagnosis(resp.data.data)
                    setDiagnosisSuccess(true)
                })
                .finally(() => {
                    setDiagnosing(false)
                })
        }, 3000)
    }

    const handleEditDiagnosis = () => {
        setEditingDiagnosis(true)
        setTimeout(() => {
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
                .then(resp => {
                    setSuccess(true)
                    setTimeout(() => handleClose(), 2000)
                })
                .finally(() => setEditingDiagnosis(false))
        }, 3000)
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                <CenterFocusStrongOutlinedIcon /> New Diagnosis
      </Button>
            <Dialog fullWidth="md" maxWidth="lg" open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton disabled={diagnosing} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            New Diagnosis
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container className={classes.contentContainer}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} className={classes.imageArea}>
                            <Paper variant="outlined" square className={classes.fileInputContainer}>
                                {
                                    !file ? (
                                        <div className={classes.flexColCentered}>
                                            <AddIcon /> <p>Add Retina Image</p>
                                        </div>
                                    ) : <img className={classes.scanImage} src={filePath} />
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
                                    <Paper elevation={3} style={{ borderRadius: '50%' }}>
                                        <IconButton color="primary" aria-label="upload scan image" component="span">
                                            <CenterFocusStrongOutlinedIcon />
                                        </IconButton>
                                    </Paper>
                                </label>
                            </Paper>
                            <Button variant="contained" color="primary" onClick={diagnose} disabled={!filePath || diagnosing}>
                                <div>
                                    <span>Diagnose</span>
                                    {renderLoadingCover()}
                                </div>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.doctorArea}>
                            {renderNoDiagnosis()}
                            <Container>
                                <Typography variant="subtitle1" component="subtitle1">
                                    System Diagnosis Prediction
                                 </Typography>
                                {
                                    diagnosis.severity ? (
                                        <div>
                                            {diagnosis.severity === 0 && <Alert severity="success">No Signs of DR!</Alert>}
                                            {diagnosis.severity === 1 && <Alert severity="info">Acute DR Detected</Alert>}
                                            {diagnosis.severity === 2 && <Alert severity="warning">Chronic DR Detected</Alert>}
                                            {diagnosis.severity === 3 && <Alert severity="error">Severe DR Detected</Alert>}
                                            {diagnosis.severity === 4 || diagnosis.severity === 5 && <Alert severity="error">Critical DR Detected</Alert>}
                                        </div>
                                    ) : null
                                }
                                <br />
                                <Divider />
                                <Typography variant="subtitle1" component="subtitle1">
                                    Doctor's Judgement
                            </Typography>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <div>
                                            <RadioGroup aria-label="severity" name="severity" value={selectedValue} onChange={handleChange}>
                                                <FormControlLabel value="0" control={<NoDRRadio />} label="No DR" />
                                                <FormControlLabel value="1" control={<MildDRRadio />} label="Acute" />
                                                <FormControlLabel value="2" control={<NonSevereDRRadio />} label="Chronic" />
                                                <FormControlLabel value="3" control={<AcuteDRRadio />} label="Severe" />
                                                <FormControlLabel value="4" control={<SevereDRRadio />} label="Critical" />
                                            </RadioGroup>
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Comment"
                                            multiline
                                            fullWidth
                                            rows={4}
                                            defaultValue=""
                                            variant="outlined"
                                            onInput={e => setComment(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid container justify="flex-end" xs={12}>
                                        <Grid item>
                                            {success &&
                                                <Alert variant="filled" severity="success">
                                                    Diagnosis saved successfully
                                                </Alert>}
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="flex-end" xs={12} className={classes.dialogActions}>
                                        <Button autoFocus color="inherit" onClick={handleClose}>
                                            cancel
                                            </Button>
                                        {/* <Button className={classes.rightActionBtn} disabled={!diagnosis.severity} autoFocus variant="contained" color="primary" onClick={handleEditDiagnosis}>
                                            save
                                            </Button> */}
                                        <div className={classes.rightActionBtnContainer}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={editingDiagnosis}
                                                onClick={handleEditDiagnosis}
                                            >
                                                save
                                            {editingDiagnosis && <CircularProgress size={24} className={classes.buttonProgress} />}
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}
