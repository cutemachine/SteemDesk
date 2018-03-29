import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Page, { Grid, GridColumn } from '@atlaskit/page'
import PageHeader from '@atlaskit/page-header'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import Banner from '@atlaskit/banner'
import { steemSelectors } from '../../state/steem'
import { unitString2Number, vests2Steem } from '../../common/utils'
import ContentWrapper from '../../components/ContentWrapper'
import UsernameInput from '../../components/UsernameInput'

class DelegateSteemPower extends Component {
  static propTypes = {
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
        </Page>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const errorMessage = steemSelectors.selectErrorMessage(state)

  return { errorMessage }
}

export default connect(mapStateToProps)(DelegateSteemPower)
