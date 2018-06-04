'use strict';
var newAccountFormConstraints = {
    firstname: {
        //First name is required
        presence: true,

        length: {
            //Should be a minimum lenght of 4
            minimum: 4
        }
    },
    lastname: {
        //last name is required
        presence: true,
        length: {
            //Should be a minimum lenght of 4
            minimum: 4
        }
    },
    email: {
        // Email is required
        presence: true,
        // and must be an email (duh)
        email: true
    },
    password: {
        // Password is also required
        presence: true,
        // And must be at least 5 characters long
        length: {
            minimum: 5
        }
    },
    confirmPassword: {
        // You need to confirm your password
        presence: true,
        // and it needs to be equal to the other password
        equality: {
            attribute: "password",
            message: "^The passwords does not match"
        }
    }
};


//Init validations here

initValidations('register-form', newAccountFormConstraints);