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
