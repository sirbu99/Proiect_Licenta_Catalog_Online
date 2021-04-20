import React from 'react';

const FormComponent = (ComposedComponent) => {
    return class FormComponent extends ComposedComponent {
        handleChange(e) {
            const { name, value } = e.target;
            this.setState({ [name]: value });
        }

        handleChangeVar(stateVarName, e) {
            const { name, value } = e.target;
            const currentState = _.get(this.state, stateVarName);
            const newState = _.assign({}, currentState, {
                [name]: value,
            });
            _.set(this.state, stateVarName, newState);
            this.setState({});
        }

        handleChangeCheckbox(e) {
            const { name, checked } = e.target;
            this.setState({ [name]: checked });
        }

        handleSelectVar(stateVarName, selectedOptions, e) {
            const currentState = _.get(this.state, stateVarName);
            const newState = _.assign({}, currentState, {
                [e.name]: selectedOptions,
            });
            _.set(this.state, stateVarName, newState);
            this.setState({});
        }

        handleFileUpload(stateVarName, files) {
            const reader = new FileReader();

            if (!_.isArray(files) || files.length === 0) {
                toastr.error('File type not allowed');
                return false;
            }

            reader.onload = (upload) => {
                const currentState = _.get(this.state, stateVarName);
                const newState = _.assign({}, currentState, {
                    fileName: files[0].name,
                    data: upload.target.result,
                });
                _.set(this.state, stateVarName, newState);
                this.setState({});
            };

            reader.readAsDataURL(files[0]);
        }


        renderField(varName, fieldName, label, type = 'text') {
            let data = _.get(this.state, varName);
            let onChange = this.handleChangeVar.bind(this, varName);

            if (_.isNull(varName)) {
                data = this.state;
                onChange = this.handleChange.bind(this);
            }

            return (
                <div className="form-group mb-3">
                    <label>{label}</label>
                    <input
                        value={_.get(data, fieldName)}
                        onChange={onChange}
                        name={fieldName}
                        type={type}
                        className="form-control form-control-md"
                    />
                    {this.renderValidationMessages(fieldName)}
                </div>
            );
        }

        renderTextEditorField(varName, fieldName, label, options = {}) {
            let data = _.get(this.state, varName);

            return (
                <div className="form-group mb-3">
                    <label>{label}</label>
                    <textarea
                        onChange={this.handleChange.bind(this, varName)}
                        value={_.get(data, fieldName)}
                        className="form-control form-control-md"
                    />
                    {this.renderValidationMessages(fieldName)}
                </div>
            );
        }
    };
};

export default FormComponent;