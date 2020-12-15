import React, { useEffect } from "react"
import { Link } from "gatsby"
import { listAppointments } from '../services/api.service'
import Layout from "../components/layout"
import SEO from "../components/seo"
import CircularProgress from '@material-ui/core/CircularProgress';
import { DataGrid } from "@material-ui/data-grid"
import Button from '@material-ui/core/Button';
import { formatDateTime } from '../utils/time.util'
import { AddCircleOutlined } from "@material-ui/icons"
import AppointmentForm from "components/appointmentForm"
import { Paper } from "@material-ui/core"

function SecondPage() {
  const [loading, setLoading] = React.useState(true);
  const [appointments, setAppointments] = React.useState([]);
  const [newDialogOpened, setNewDialoOpened] = React.useState(false);
  const [patient, setPatient] = React.useState(null);

  const fetchAppointments = () => {
    setLoading(true)
    console.log('appointments: ', appointments)
    console.log('fetching appointments...')
    listAppointments()
      .then(data => {
        const _appointments = []
        data.data.data.map(appointment => {
          const _apDate = new Date(appointment.appointmentDate)
          const _ap = {}
          _ap.appointmentDate = formatDateTime(appointment.appointmentDate)
          _ap.patientName = appointment.patient.firstName + ' ' + appointment.patient.lastName
          _ap.patientPhone = appointment.patient.phone
          _ap.patientId = appointment.patient.patientId
          _ap.patientFileNumber = appointment.patient.fileNumber
          _ap.id = appointment.id
          _appointments.push(_ap)
        })
        setAppointments(_appointments)
      })
      .finally(() => {
        console.log(appointments)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const columns = [
    { field: 'patientName', headerName: 'Patient Name', width: 300 },
    { field: 'appointmentDate', headerName: 'Appointment Date', width: 250 },
    { field: 'patientPhone', headerName: 'Patient Phone Number', width: 250 },
    { field: 'patientFileNumber', headerName: 'Patient File Number', width: 200 },
    { field: 'patientId', headerName: 'Patient ID', width: 250 },
    {
      field: '', headerName: '',
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="info"
            size="sm"
            style={{ marginLeft: 16 }}
            onClick={e => {
              setPatient(params.data)
              setNewDialoOpened(true)
            }}
          >
            <span className='material-icons'>EDIT</span>
          </Button>
        </strong>
      )
    },
  ];

  const handleOpenDialog = () => {
    setNewDialoOpened(true)
  }

  const handleCloseModal = () => {
    console.log('handling close...')
    setNewDialoOpened(false)
  }

  return (
    <Layout>
      <SEO title="Appointments" />
      <Paper>
        <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
          <AddCircleOutlined /> New Appointment
      </Button>
        {
          newDialogOpened && <AppointmentForm selectedPatient={patient} newDialogOpened={newDialogOpened} setNewDialoOpened={setNewDialoOpened} fetchAppointments={fetchAppointments} handleCloseModal={handleCloseModal} appointments={appointments} />
        }
        <h1>Appointments</h1>
        {
          loading ?
            <div style={{
              minHeight: '30vh',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
          }}><CircularProgress /></div> :
            <div style={{ height: '70vh' }}>
              <DataGrid
                pageSize={7}
                columns={columns}
                rows={appointments}
              />
            </div>
        }
      </Paper>
    </Layout>
  )
}

export default SecondPage
