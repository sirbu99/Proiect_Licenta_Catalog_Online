import Joi from 'joi-browser';

const RegisterValidation = (ComposedComponent) => {
    return class RegisterValidation extends ComposedComponent {
        constructor(props) {
            super(props);

            this.validationSchema = {
                identification_number: Joi.number().integer().positive().required(),
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().email().required(),
                username: Joi.string().required(),
                role_id: Joi.string().required(),
                birthday: Joi.date().required(),
                address: Joi.string().required(),
                invitation_code: Joi.string().required(),
                password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,128})/).min(10).max(128),
                password_confirmation: Joi.any().valid(Joi.ref('password')),
            };

            this.validationValue = () => {
                return this.state;
            };

            this.validationMessages = {
                first_name: 'Please Enter Your First Name',
                last_name: 'Please Enter Your Last Name',
                email: 'Invalid Email',
                password: 'Password Is Too Weak',
                confirmed_password: 'Passwords Do Not Match',
            };
        };
    }
};


export default RegisterValidation;