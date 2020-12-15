export const DOMAIN = 'http://localhost:3000/'
// export const DOMAIN = 'https://dredcore.herokuapp.com/'

const GATEWAY = DOMAIN+'api/v1/'
export const routes = {
    LOGIN: GATEWAY + 'auth',
    SAVE_DIAGNOSIS: GATEWAY + 'diagnosis/new/',
    EDIT_DIAGNOSIS: GATEWAY + 'diagnosis/edit/',
    DELETE_DIAGNOSIS: GATEWAY + 'diagnosis/delete/',
    PATIENT: GATEWAY + 'patient/',
    EDIT_PATIENT: GATEWAY + 'patient/edit/',
    REGISTER_PATIENT: GATEWAY + 'patient/register',
    ALL_PATIENTS: GATEWAY + 'patient/all',
    DOCTOR: GATEWAY + 'doctor/',
    SEARCH_PATIENTS: GATEWAY + '/patient/search/',
    APPOINTMENT: GATEWAY + '/appointment/'
}