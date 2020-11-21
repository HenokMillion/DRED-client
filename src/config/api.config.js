export const DOMAIN = 'http://localhost:3000/'
const GATEWAY = DOMAIN+'api/v1/'
export const routes = {
    SAVE_DIAGNOSIS: GATEWAY + 'diagnosis/new/',
    EDIT_DIAGNOSIS: GATEWAY + 'diagnosis/edit/',
    DELETE_DIAGNOSIS: GATEWAY + 'diagnosis/delete/',
    PATIENT: GATEWAY + 'patient/'
}