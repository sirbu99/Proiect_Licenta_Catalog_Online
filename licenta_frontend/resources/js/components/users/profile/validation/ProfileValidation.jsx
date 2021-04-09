import React from 'react';
import Joi from 'joi-browser';

const ProfileValidation = (ComposedComponent) => {
    return class ProfileValidation extends ComposedComponent {
        constructor(props) {
            super(props);

            this.validationSchema = {
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                username: Joi.string().required(),
                about_me: Joi.string().required(),
                password: Joi.string().allow('').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,128})/).min(10).max(128),
                password_confirmation: Joi.any().valid(Joi.ref('password')),
            };

            this.validationValue = () => {
                return this.state.user;
            };

            this.validationMessages = {
                first_name: 'First name is required',
                last_name: 'Last name is required',
                username: 'Username field is required',
                about_me: 'About me field is required',
                password: 'Please choose a strong password',
                confirmed_password: 'Passwords do no match',
            };
        };
    }
};


export default ProfileValidation;
