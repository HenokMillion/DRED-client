import { post, multipartPost, put, get } from './http'
import { routes } from '../config/api.config'
import { getAuthUser } from './auth'

let HEADER = {}

export const setHeader = (header) => {
    HEADER = header
}

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
    }, HEADER)
}

export const fetchPatientDataById = async (patientId) => {
    const patientData = await get(routes.PATIENT+patientId, HEADER)
    return patientData.data.data
}

export const fetchAllPatients = async () => {
    return await get(routes.ALL_PATIENTS, HEADER)
}


export const listAppointments = async () => {
    return await get(routes.DOCTOR+getAuthUser().id+'/appointments', HEADER)
}

export const searchPatients = async (partialName) => {
    return await get(routes.SEARCH_PATIENTS+partialName, HEADER)
}

export const saveAppointment = async (appointment) => {
    return await post(routes.APPOINTMENT+'new', appointment, HEADER)
}

export const savePatient = async (patient) => {
    return await post(routes.REGISTER_PATIENT, patient, HEADER)
}