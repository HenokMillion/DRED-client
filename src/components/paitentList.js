import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import PatientForm from './patientForm';
import { navigate } from "gatsby"
import { fetchAllPatients, fetchPatientDataById } from '../services/api.service';
import { formatDate } from '../utils/time.util'
import CircularProgress from '@material-ui/core/CircularProgress';

class PaitentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isLoadingPatients: false,
            patients: [
                // { id: '12312321', paitentId: '1234', patientName: 'Aschalew Tamene', patientAge: 45, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() },
                // { id: '12312322', paitentId: '1234', patientName: 'Ambachew Demeke', patientAge: 22, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() },
                // { id: '12312323', paitentId: '1234', patientName: 'Yilqal Tesema', patientAge: 34, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() },
                // { id: '123123234', paitentId: '1234', patientName: 'Nakachew Tamene', patientAge: 56, patientSex: 'male', patientLastDiagnosis: new Date(Date.now()).toDateString(), patientLastStatus: 'severe', patientNextAppointement: new Date(Date.now()).toDateString() },
            ],
            selectedPatient: null
        };
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    async componentDidMount() {
        this.fetchPatients()
    }

    async fetchPatients() {
        this.setState({ isLoadingPatients: true })
        const patients = (await fetchAllPatients()).data.data
        const _patients = []
        patients.map(patient => {
            const _patient = {}
            _patient.id = patient._id
            _patient.patientId = patient.patientId
            _patient.patientName = patient.firstName + ' ' + patient.lastName
            _patient.patientAge = new Date().getUTCFullYear() - new Date(patient.birthDate).getUTCFullYear()
            _patient.patientSex = patient.sex
            _patient.patientLastDiagnosis = patient.diagnoses ? patient.diagnoses[patient.diagnoses.length - 1] ?
                formatDate(patient.diagnoses[patient.diagnoses.length - 1].diagnosis_date) : '-' : '-'
            _patient.patientLastStatus = patient.diagnoses ?
                patient.diagnoses[patient.diagnoses.length - 1] ?
                    patient.diagnoses[patient.diagnoses.length - 1].comment ?
                        patient.diagnoses[patient.diagnoses.length - 1].comment[0] ?
                            patient.diagnoses[patient.diagnoses.length - 1].comment[0].severity
                            : '-' : '-' : '-' : '-'
            _patient.patientNextAppointement = 'Nov 13 2021'
            _patient.email = patient.email
            _patient.phone = patient.phone
            _patient.fileNumber = patient.fileNumber
            _patient.address = patient.address
            _patients.push(_patient)
        })
        this.setState({ patients: _patients, isLoadingPatients: false })
    }

    handleModalClose() {
        this.setState((prevState) => ({
            selectedPatient: null,
            isModalOpen: !prevState.isModalOpen
        }));
        this.fetchPatients()
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
            { field: 'patientId', headerName: 'Patient ID', width: 100 },
            { field: 'patientName', headerName: 'Patient Name', width: 450 },
            { field: 'patientAge', headerName: 'Age', width: 75 },
            { field: 'patientSex', headerName: 'Sex', width: 75 },
            { field: 'patientLastDiagnosis', headerName: 'Last Diagnosis', width: 200 },
            { field: 'patientNextAppointement', headerName: 'Appointment', width: 150 },
            { field: 'patientLastStatus', headerName: 'Status', width: 150 },
            {
                field: '', headerName: '',
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
                    {this.state.isLoadingPatients && <CircularProgress />}
                    {!this.state.isLoadingPatients &&
                        <DataGrid
                            onRowClick={e => {
                                setTimeout(() => {
                                    if (!this.state.isModalOpen) {
                                        navigate('/patient/' + e.data.patientId)
                                    }
                                }, 200)
                            }}
                            columns={columns}
                            rows={this.state.patients} />
                    }

                </div>
            </>
        );
    }
}

export default PaitentList;