import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { steemOperations, steemSelectors } from '../state/steem'
import Page, { Grid, GridColumn } from '@atlaskit/page'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import Input from '@atlaskit/input'
import FieldBase from '@atlaskit/field-base'
import MentionIcon from '@atlaskit/icon/glyph/mention'

const UserInputForm = ({values, errors, touched, isSubmitting, handleChange, setFieldValue, ...rest}) => (
  <Form>
    <FieldBase
      isLoading={isSubmitting}
      isFitContainerWidthEnabled
      isInvalid={touched.user && errors.user}
      invalidMessage={touched.user && errors.user}
    >
      <MentionIcon primaryColor='gray' />&nbsp;
      <Input isEditing type='text' name='user' placeholder='username …' value={values.user} onChange={handleChange} />
    </FieldBase>
  </Form>
)

const UserInput = withFormik({
  mapPropsToValues (props) {
    return {
      user: props.username || ''
    }
  },
  validationSchema: Yup.object().shape({
    user: Yup.string().strict().lowercase('Only lowercase characters are allowed.').min(3, 'User is at least three characters long.').required('User is required.')
  }),
  handleSubmit (values, {props, setErrors, setSubmitting}) {
    props.usernameSubmitted(values.user)
      .then(() => {
        setSubmitting(false)
      })
      .catch((error) => {
        setErrors({ user: error.message })
        setSubmitting(false)
      })
  }
})(UserInputForm)

// export default UserInput
const mapDispatchToProps = {
  usernameChanged: steemOperations.usernameChanged,
  usernameSubmitted: steemOperations.usernameSubmitted
}

const mapStateToProps = (state) => {
  const username = steemSelectors.selectUsername(state)
  const usernameStatus = steemSelectors.selectUsernameStatus(state)

  return { username, usernameStatus }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInput)
