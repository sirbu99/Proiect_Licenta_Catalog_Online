import Joi from 'joi-browser';

const PasswordValidation = (ComposedComponent) => {
    return class PasswordValidation extends ComposedComponent {
        constructor(props) {
            super(props);

            this.validationSchema = {
                password: Joi.string().allow('').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,128})/).min(8).max(128),
                password_confirmation: Joi.any().valid(Joi.ref('password')),
            };

            this.validationValue = () => {
                return this.state.passInfo;
            };

            this.validationMessages = {
                password: 'Your password is not strong enough',
                password_confirmation: 'Passwords do no match',
            };
        };
    }
};


export default PasswordValidation;
