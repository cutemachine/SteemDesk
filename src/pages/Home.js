import React, { Component } from 'react'
import MainSection from '../components/MainSection'
import ContentWrapper from '../components/ContentWrapper'
import PageTitle from '../components/PageTitle'

class Home extends Component {
  render () {
    return (
      <ContentWrapper>
        <PageTitle>SteemDesk</PageTitle>
        <MainSection />
      </ContentWrapper>
    )
  }
}

export default Home
