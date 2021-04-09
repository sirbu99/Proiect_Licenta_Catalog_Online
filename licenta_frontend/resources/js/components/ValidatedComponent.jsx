import React from 'react';
import Joi from 'joi-browser';

const ValidatedComponent = (ComposedComponent) => {
    return class ValidatedComponent extends ComposedComponent {
        constructor(props) {
            super(props);

            this.initialState = {
                validation: {
                    dirty: [],
                    errors: [],
                    value: null,
                },
            };

            this.state.validation = this.initialState.validation;
        }

        validate = (path, callback) => {
            const validationValue = _.cloneDeep(_.result(this, 'validationValue', this.state));
            if (typeof validationValue === 'object' && validationValue.hasOwnProperty('validation')) {
                delete validationValue.validation;
            }
            const validationSchema = _.result(this, 'validationSchema');
            const validationOptions = _.merge({
                abortEarly: false,
                allowUnknown: true,
            }, _.result(this, 'validationOptions', {}));
            Joi.validate(validationValue, validationSchema, validationOptions, (error, value) => {
                const validation = _.get(this.state, 'validation', {});
                validation.errors = (error && error.details) ? error.details : [];
                validation.value = value;
                const pushDirty = (p, dirtyArr = []) => {
                    if (p && dirtyArr.indexOf(p) === -1) {
                        dirtyArr.push(p);
                    }
                    const pArr = p.split('.');
                    if (pArr.length > 1) {
                        pArr.splice(-1, 1);
                        pushDirty(pArr.join('.'), dirtyArr);
                    }
                };
                pushDirty(path, validation.dirty);
                _.set(this.state, 'validation', validation);
                this.setState({}, callback || null);
            });
        };

        isValid = (path) => {
            let errors = _.get(this.state, 'validation.errors', []);
            if (path) {
                errors = _.filter(errors, (error) => (
                    error.path === path
                    || _.startsWith(error.path, `${path}.`)
                    || _.includes(error.path, path)
                ));
            }
            return errors.length === 0;
        };

        isDirty = (path) => {
            let dirty = _.get(this.state, 'validation.dirty', []);
            if (path) {
                dirty = _.filter(dirty, (d) => d === path);
            }
            return dirty.length !== 0;
        };

        getValidationMessages = (path) => {
            let errors = _.get(this.state, 'validation.errors', []);
            if (path) {
                errors = _.filter(errors, (error) => (
                    error.path === path
                    || _.startsWith(error.path, `${path}.`)
                    || _.includes(error.path, path)
                ));
            }

            if (errors.length > 0) {
                return _.get(this, `validationMessages.${path}`, errors);
            }

            return errors;
        };

        getValidationValue = () => {
            return _.cloneDeep(_.get(this.state, 'validation.value'));
        };

        resetValidation = (path = null, callback = null) => {
            const errors = _.get(this.state, 'validation.errors', []);

            if (_.isNull(path)) {
                this.setState(this.initialState, callback);
                return;
            }

            this.setState({
                validation: {
                    ...this.state.validation,
                    errors: _.filter(errors, (e) => _.get(e, 'context.key') === path),
                }
            }, callback);
        };

        renderValidationMessages = (path, className = 'text-danger', onlyFirst = true) => {
            let errors = this.getValidationMessages(path);

            if (!_.isArray(errors)) {
                errors = [errors];
            }
            if (errors.length !== 0 && this.isDirty(path)) {
                errors = onlyFirst ? [errors[0]] : errors;
                const html = errors.map((error) => {
                    return _.isObject(error) ? error.message : error;
                });
                return (<div className={className}>{html}</div>);
            }
            return null;
        };
    };
};

export default ValidatedComponent;
