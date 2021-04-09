import React from 'react';
import Joi from 'joi-browser';

const LoginValidation = (ComposedComponent) => {
    return class LoginValidation extends ComposedComponent {

        constructor(props) {
            super(props);

            this.validationSchema = {
                email: Joi.string().email().required(),
                password: Joi.string().required(),
            };

            this.validationValue = () => {
                return this.state;
            };

            this.validationMessages = {
                email: 'Please fill in an email',
                password: 'auth.validation:password_required',
            };
        };
    }

};

export default LoginValidation;