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
import { Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

export default function DiagnosisCard({ diagnosis }) {
    console.log('DIAGNOSIS: ', diagnosis)
    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
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
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
    <p><b>Doctor's Comment:</b> { diagnosis.comment ? diagnosis.comment[0].comment : '' }</p>
                        <div>
                            <div className={classes.row}>
                                <p></p>
                                <p>Dr. A</p>
                            </div>
                            <div className={classes.row}>
                                <p>{ diagnosis.diagnosis_date }</p>
                                <p>-</p>
                            </div>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
    )
}
