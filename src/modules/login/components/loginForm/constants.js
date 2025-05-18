
export const loginError = "User and/or password not found";

export const tags = {
    email: "email",
    password: "password",
    loginBtn: "logIn",
};

export const formValidation = {
    email: {
        required: "Email is required",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid format",
        },
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
        },
        maxLength: {
            value: 12,
            message: "Password must be at most 12 characters",
        },
    },
};