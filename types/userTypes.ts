export interface DataUser {
    accessToken: string,
    name: string,
    refreshToken: string,
}

export interface InputDataLogin {
    email: string,
    password: string,
}

export interface UserInfo {
    address: string, 
    cityId: number,
    country: string,
    createdAt: number,
    email: string,
    firstName: string,
    id: number,
    ipReg: string,
    lastName: string,
    passcode: string,
    password: string,
    phone: string,
    resetPasswordExpires: string,
    resetPasswordToken: string,
    state: string,
    zip: number,
}