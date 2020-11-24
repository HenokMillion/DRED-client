const GATEWAY = 'http://localhost:3000/api/v1/'
export const routes = {
    SAVE_DIAGNOSIS: GATEWAY + 'diagnosis/new/',
    EDIT_DIAGNOSIS: GATEWAY + 'diagnosis/edit/',
    DELETE_DIAGNOSIS: GATEWAY + 'diagnosis/delete/',
    PATIENT: GATEWAY + 'patient/'
}