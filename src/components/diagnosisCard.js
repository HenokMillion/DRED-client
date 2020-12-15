import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';

import { logout } from '../services/auth'
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { formatDate } from '../utils/time.util'
import { DOMAIN } from '../config/api.config'

export default function DiagnosisCard({ diagnosis }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            minWidth: 200,
            margin: 10
        },
        media: {
            height: 140,
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        severity: {
            width: 40,
            height: 12,
            backgroundColor: 'green',
            borderRadius: '3px'
        }
    }))

    const classes = useStyles();
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
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={DOMAIN+diagnosis.imagePath}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant="body2"><b>Doctor's Comment:</b> {diagnosis.comment ? diagnosis.comment[0] ? diagnosis.comment[0].comment : '' : ''}</Typography>
                    <Grid container>
                        <Grid spacing={3} container className={classes.row}  justify="space-between">
                            <Grid item><Typography variant="body1"></Typography></Grid>
                            <Grid item><Typography variant="body2">Dr. A</Typography></Grid>
                        </Grid>
                        <Grid spacing={3} container className={classes.row} justify="space-between">
                            <Grid item><Typography variant="body2">{formatDate(diagnosis.diagnosis_date)}</Typography></Grid>
                            <Grid item><div className={classes.severity}></div></Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
