import Joi from 'joi-browser';

const UserValidation = (ComposedComponent) => {
    return class UserValidation extends ComposedComponent {
        constructor(props) {
            super(props);

            this.validationSchema = {
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                email: Joi.string().email().required(),
                username: Joi.string().required(),
                password: Joi.string().allow('').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,128})/).min(10).max(128),
                password_confirmation: Joi.any().valid(Joi.ref('password')),
            };

            this.validationValue = () => {
                return this.state.user;
            };

            this.validationMessages = {
                first_name: 'auth.validation:first_name',
                last_name: 'auth.validation:last_name',
                password: 'auth.validation:password_strong',
                confirmed_password: 'auth.validation:password_match',
            };
        };
    }
};


export default UserValidation;