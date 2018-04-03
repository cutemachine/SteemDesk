import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Page, { Grid, GridColumn } from '@atlaskit/page'
import PageHeader from '@atlaskit/page-header'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import Banner from '@atlaskit/banner'
import { steemSelectors } from '../../state/steem'
import ContentWrapper from '../../components/ContentWrapper'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import Input from '@atlaskit/input'
import FieldBase, { Label } from '@atlaskit/field-base'
import Button from '@atlaskit/button'
import SingleSelect from '@atlaskit/single-select'
import styled from 'styled-components'

const delegateSteemPower = (values) => {
  const delegationURL = `https://steemconnect.com/sign/delegate-vesting-shares?delegator=${values.delegator}&delegatee=${values.delegatee}&vesting_shares=${values.amount} ${values.unit}`
  window.open(delegationURL)
}

const ButtonRight = styled(Button)`
  float: right;
  margin-right: 0px;
`

const selectItems = [
  {
    items: [
      { content: 'SP', value: 'SP' },
      { content: 'VESTS', value: 'VESTS' }
    ]
  }
]

const mySel = ({field, form, ...rest}) => (
  <SingleSelect {...field} {...rest}
    type='select'
    label='Unit'
    items={selectItems}
    placeholder='Choose a unit'
    defaultSelected={selectItems[0].items[0]}
    onSelected={(item) => {
      form.setFieldValue('unit', item.item.value)
    }}
  />
)

const DelegationForm = ({values, errors, touched, isSubmitting, handleChange, setFieldValue}) => (
  <Form>
    <Label label='Delegator' />
    <FieldBase isFitContainerWidthEnabled isInvalid={touched.delegator && errors.delegator} invalidMessage={touched.delegator && errors.delegator}>
      <Input isEditing type='text' name='delegator' placeholder='Delegator' value={values.delegator} onChange={handleChange} />
    </FieldBase>
    <Label label='Delegatee' />
    <FieldBase isFitContainerWidthEnabled isInvalid={touched.delegatee && errors.delegatee} invalidMessage={touched.delegatee && errors.delegatee}>
      <Input isEditing type='text' name='delegatee' placeholder='Delegatee' value={values.delegatee} onChange={handleChange} />
    </FieldBase>
    <Grid layout='fluid'>
      <GridColumn medium={6}>
        <Label label='Amount' />
        <FieldBase isFitContainerWidthEnabled invalidMessage={touched.amount && errors.amount}>
          <Input isEditing type='text' name='amount' placeholder='Amount' value={values.amount} onChange={handleChange} />
        </FieldBase>
      </GridColumn>
      <GridColumn medium={3}>
        <Field name='unit' component={mySel} />
      </GridColumn>
      <GridColumn medium={3}>
        <Label label='&nbsp;' />
        <ButtonRight type='submit' appearance='primary' isDisabled={isSubmitting}>Delegate</ButtonRight>
      </GridColumn>
    </Grid>
  </Form>
)

const DelegationFormik = withFormik({
  mapPropsToValues (props) {
    return {
      delegator: props.delegator || '',
      delegatee: props.delegatee || '',
      amount: props.amount || '100',
      unit: props.unit || 'SP'
    }
  },
  validationSchema: Yup.object().shape({
    delegator: Yup.string().strict().lowercase('Only lowercase characters are allowed.').min(3, 'Delegator is at least three characters long.').required('Delegator is required.'),
    delegatee: Yup.string().strict().lowercase('Only lowercase characters are allowed.').min(3, 'Delegator is at least three characters long.').required('Delegatee is required.'),
    amount: Yup.number('Amount must be a positive number.').positive('You cannot make negative delegations.').required('Amount is required.')
  }),
  handleSubmit (values, {resetForm, setErrors, setSubmitting}) {
    if (values.delegator === values.delegatee) {
      setErrors({ delegatee: 'Delegator and delegatee cannot be the same.' })
    } else {
      delegateSteemPower(values)
      resetForm()
    }
    setSubmitting(false)
  }
})(DelegationForm)

class DelegateSteemPower extends Component {
  static propTypes = {
    username: PropTypes.string,
    errorMessage: PropTypes.string
  }

  render () {
    const Icon = <ErrorIcon label='Error icon' secondaryColor='inherit' />

    return (
      <ContentWrapper>
        <Page>
          { // Show error banner only when there is an error set
            (this.props.errorMessage !== '')
              ? <Banner icon={Icon} isOpen appearance='error'>{this.props.errorMessage}</Banner>
              : null
          }
          <PageHeader
            breadcrumbs={null}
            actions={null}
            bottomBar={null}
          >
            Delegate Steem Power
          </PageHeader>
          <DelegationFormik delegator={this.props.username} />
        </Page>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const username = steemSelectors.selectUsername(state)
  const errorMessage = steemSelectors.selectErrorMessage(state)

  return { username, errorMessage }
}

export default connect(mapStateToProps)(DelegateSteemPower)
