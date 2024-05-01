function validation(values){
   
    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_patterns = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

    if(values.username === ""){
        error.username = "Name should not be empty"
    }
    else{
        error.username = " "
    }

    if(!email_pattern === ""){
        error.email = "Email should not be empty"
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Email did not match !"
    }
    else{
        error.email = " "
    }
    if(!password_patterns === ""){
        error.password = "Password should not be empty"
    }
    else if (!password_patterns.test(values.password)) {
        error.password = "Password did not match !"
    }
    else{
        error.password = " "
    }
    return error

}

export default validation;