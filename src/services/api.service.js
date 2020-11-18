import { post, multipartPost, put } from './http'
import { routes } from './api.config'

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