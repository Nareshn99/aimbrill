const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,15}$/



export const isValidEmail = (data) => {
    if (typeof data == "string" && data.trim().length !== 0 && emailRegex.test(data.trim())) return true
    return false
}

export const isValidPassword = (data) => {
    if (typeof data == "string" && data.trim().length !== 0 && passwordRegex.test(data.trim())) return true
    return false
}
