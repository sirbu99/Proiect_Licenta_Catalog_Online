import Joi from 'joi-browser';

const RegisterValidation = (ComposedComponent) => {
    return class RegisterValidation extends ComposedComponent {
        constructor(props) {
            super(props);

            this.validationSchema = {
                password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,128})/).min(8).max(128),
                password_confirmation: Joi.any().valid(Joi.ref('password')),
            };

            this.validationValue = () => {
                return this.state;
            };

            this.validationMessages = {
                password: 'Password Is Too Weak',
                password_confirmation: 'Passwords Do Not Match',
            };
        };
    }
};


export default RegisterValidation;