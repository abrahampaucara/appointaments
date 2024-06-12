export const validate = (form) => {
    let errors = {};
    if (!form.username) {
        errors.username = "Name is required";
    }
    if (!form.password) {
        errors.password = "Password is required";
    }
    return errors;
}
