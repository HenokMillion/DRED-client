import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';


class PaitentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            paitents: [
                { id: '12312321', paitentId: '1234', patientName: 'Aschalew Tamene', patientAge: 45, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() },
                { id: '12312322', paitentId: '1234', patientName: 'Ambachew Demeke', patientAge: 22, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() },
                { id: '12312323', paitentId: '1234', patientName: 'Yilqal  Tesema', patientAge: 34, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() },
                { id: '123123234', paitentId: '1234', patientName: 'Nakachew  Tamene', patientAge: 56, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() },

            ]
        };
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleModalClose() {
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen
        }));
    }

    getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    render() {
        const columns = [
            { field: 'paitentId', headerName: 'Patient ID', width: 100 },
            { field: 'patientName', headerName: 'Patient Name', width: 450 },
            { field: 'patientAge', headerName: 'Age', width: 75 },
            { field: 'patientSex', headerName: 'Sex', width: 75 },
            { field: 'patientLastDiagnosis', headerName: 'Last Diagnosis', width: 200 },
            { field: 'patientNextAppointement', headerName: 'Appointment', width: 150 },
            { field: 'patientLastStatus', headerName: 'Status', width: 150 },
            { field: '', width: 100 },
        ];
        const rows = [];

        const useStyles = makeStyles((theme) => ({
            paper: {
                position: 'absolute',
                width: 400,
                backgroundColor: '#fff',
                border: '2px solid #000',
                top: `${50}%`,
                left: `${50}%`,
                transform: `translate(-${50}%, -${50}%)`,
                //   boxShadow: theme.shadows[5],
                //   padding: theme.spacing(2, 4, 3),
            },
        }));


        return (
            <>
                <Button onClick={this.handleModalClose} style={{ right: 0, position: "static" }} color="primary" >
                    Add Patient
                </Button>
                <div style={{ height: "75vh", }}>
                    <DataGrid
                        columns={columns}
                        rows={this.state.paitents} />
                </div>
                <Modal
                    open={this.state.isModalOpen}
                    onClose={this.handleModalClose}
                    style={useStyles}
                >
                    <div>
                        <h2 id="simple-modal-title">Text in a modal</h2>
                        <p id="simple-modal-description">
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                         </p>
                    </div>
                </Modal>

            </>
        );
    }
}

export default PaitentList;