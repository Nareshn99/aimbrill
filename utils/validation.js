const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const isValidEmail = (data) => {
    if (typeof data == "string" && data.trim().length !== 0 && emailRegex.test(data.trim())) return true
    return false
}


