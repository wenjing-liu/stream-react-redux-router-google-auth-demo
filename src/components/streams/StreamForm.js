import React from 'react'
import { Field, reduxForm } from 'redux-form'


class StreamForm extends React.Component {
  renderError ({error, touched}) {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }
  renderInput = ({ input, label, meta}) => {
    const className= `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input { ...input } autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }
  render () {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title"></Field>
        <Field name="description" component={this.renderInput} label="Enter Description"></Field>
        <button className="ui button primary">Submit</button>
      </form>
    )
  }
}

function validate (formValues) {
  const errors = {}
  if (!formValues.title) {
    errors.title = 'You must input a title'
  }

  if (!formValues.description) {
    errors.description = "You must input a description"
  }
  return errors
}


export default reduxForm({
  form: 'streamform',
  validate
})(StreamForm)
