import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import PatientForm from './patientForm';
import { navigate } from "gatsby"

class PaitentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            paitents: [
                { id: '12312321', paitentId: '1234', patientName: 'Aschalew Tamene', patientAge: 45, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() },
                { id: '12312322', paitentId: '1234', patientName: 'Ambachew Demeke', patientAge: 22, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() },
                { id: '12312323', paitentId: '1234', patientName: 'Yilqal Tesema', patientAge: 34, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() },
                { id: '123123234', paitentId: '1234', patientName: 'Nakachew Tamene', patientAge: 56, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() },
            ],
            selectedPatient: null
        };
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleModalClose() {
        this.setState((prevState) => ({
            selectedPatient: null,
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

    setOpen(boolean) {
        this.setState({ isModalOpen: boolean })
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
            {
                field: '', headerName: 'Action',
                renderCell: (params) => (
                    <strong>
                        <Button
                            variant="contained"
                            color="info"
                            size="sm"
                            style={{ marginLeft: 16 }}
                            onClick={(param) => { this.setState({ selectedPatient: params.data }); this.setOpen(true) }}
                        >
                            <span className='material-icons'>EDIT</span>
                        </Button>
                    </strong>
                )
            },
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
                <PatientForm
                    showAddBtn={true}
                    open={this.state.isModalOpen}
                    setOpen={this.setOpen}
                    selectedPatient={this.state.selectedPatient}
                    handleModalClose={this.handleModalClose}
                    /* patient props needs to be given here*/ />
                <div style={{ height: "75vh", }}>
                    <DataGrid
                        onRowClick={e => {
                            setTimeout(() => {
                                if (!this.state.isModalOpen) {
                                    navigate('/patient/' + e.data.paitentId)
                                }
                            }, 200)
                        }}
                        columns={columns}
                        rows={this.state.paitents} />
                </div>
            </>
        );
    }
}

export default PaitentList;