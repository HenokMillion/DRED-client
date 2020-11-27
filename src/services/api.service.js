import { post, multipartPost, put, get } from './http'
import { routes } from '../config/api.config'

export const saveDiagnosis = (file, doctorId, patientId) => {
    return multipartPost(routes.SAVE_DIAGNOSIS, {
        image: file,
        doctorId: doctorId,
        patientId: patientId
    })
}

export const editDiagnosis = (diagnosisId, diagnosis) => {
    return put(routes.EDIT_DIAGNOSIS+diagnosisId, {
        newDiagnosis: diagnosis
    })
}

export const fetchPatientDataById = async (patientId) => {
    const patientData = await get(routes.PATIENT+patientId)
    return patientData.data.data
}

export const fetchAllPatients = async () => {
    return await get(routes.ALL_PATIENTS, { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6bnVsbCwiZmlyc3ROYW1lIjoibmFtZSIsImxhc3ROYW1lIjoibG5hbWUiLCJyb2xlIjoiU3RyaW5nIiwiYXBwb2ludG1lbnRzIjpbXSwiY2FuQ29tbWVudCI6dHJ1ZSwiY2FuTGFiZWwiOnRydWUsInByb2ZpbGVQaWNQYXRoIjoiU3RyaW5nIiwicGF0aWVudHMiOltdLCJpYXQiOjE2MDY0NjY0MTB9.IT4W019zkfruknyQRdcnVGVoK_x1rkdz14sIsklQYo8' })
}
