import React, { Component } from 'react'
import Page from '@atlaskit/page'
import MainSection from '../components/MainSection'
import ContentWrapper from '../components/ContentWrapper'
import PageHeaderWithUserinput from '../components/PageHeaderWithUserinput'

class Home extends Component {
  render () {
    return (
      <ContentWrapper>
        <Page>
          <PageHeaderWithUserinput title='SteemDesk' />
          <MainSection />
        </Page>
      </ContentWrapper>
    )
  }
}

export default Home
