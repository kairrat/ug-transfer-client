const baseUrl = "http://5.35.89.71:3001";

export const Endpoints = {
    uploadFiles: baseUrl + '/users/upload',
    requestCode: baseUrl + '/users/clients/make-call',
    verifyCoe: baseUrl + '/users/clients/register',
    getProfile: baseUrl + '/users/clients/info',
    updateProfile: baseUrl + '/users/clients/update',
    createOrder: baseUrl + '/order/create',
    updateFcmToken: baseUrl + '/users/drivers/token'
}