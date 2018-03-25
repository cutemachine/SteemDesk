import React, { Component } from 'react'
import ContentWrapper from '../components/ContentWrapper'
import UsernameInput from '../components/UsernameInput'
import Page from '@atlaskit/page'
import PageHeader from '@atlaskit/page-header'

const actionsContent = (
  <UsernameInput />
)

class Dashboard extends Component {
  render () {
    return (
      <ContentWrapper>
        <Page>
          <PageHeader
            breadcrumbs={null}
            actions={actionsContent}
            bottomBar={null}
          >
            Dashboard
          </PageHeader>
        </Page>
      </ContentWrapper>
    )
  }
}

export default Dashboard
