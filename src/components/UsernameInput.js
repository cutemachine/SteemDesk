import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { steemOperations, steemSelectors } from '../state/steem'
import Input from '@atlaskit/input'
import FieldBase from '@atlaskit/field-base'

class UsernameInput extends Component {
  static propTypes = {
    usernameStatus: PropTypes.string,
    usernameChanged: PropTypes.func,
    usernameSubmitted: PropTypes.func
  }

  onChange (value) {
    this.props.usernameChanged(value)
  }

  onSubmit () {
    this.props.usernameSubmitted()
  }

  render () {
    const isValidating = this.props.usernameStatus === 'VALIDATING' ? true : false
    const isInvalid = this.props.usernameStatus === 'INVALID' ? true : false

    return (
      <FieldBase isInvalid={isInvalid} isLoading={isValidating} onBlur={() => this.onSubmit()}>
        <Input isEditing autoFocus
          onKeyUp={
            event => {
              const { keyCode } = event
              if (keyCode === 13) this.onSubmit()
              let validKeyCode = 
                (keyCode === 8) ||  // backspace
                (keyCode === 46) || // delete
                (keyCode > 47 && keyCode < 58)   || // number keys
                (keyCode > 64 && keyCode < 91)   || // letter keys
                (keyCode > 95 && keyCode < 112)  || // numpad keys
                (keyCode === 189) // - Dash
              if (validKeyCode) this.onChange(event.target.value)
            }
          }
          type="text"
          placeholder="username …"
        />
      </FieldBase>
    )
  }
}

const mapDispatchToProps = {
  usernameChanged: steemOperations.usernameChanged,
  usernameSubmitted: steemOperations.usernameSubmitted
}

const mapStateToProps = (state) => {
  const usernameStatus = steemSelectors.selectUsernameStatus(state)

  return { usernameStatus }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsernameInput)
