import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainSection from '../components/MainSection'
import ContentWrapper from '../components/ContentWrapper'
import PageTitle from '../components/PageTitle'
import { uiOperations } from '../state/ui'

class HomePage extends Component {
  static propTypes = {
    addFlag: PropTypes.func
  }

  componentDidMount () {
    this.props.addFlag('SteemDesk', '… loves you')
  }

  render () {
    return (
      <ContentWrapper>
        <PageTitle>SteemDesk</PageTitle>
        <MainSection />
      </ContentWrapper>
    )
  }
}

const mapDispatchToProps = {
  addFlag: uiOperations.addFlag
}

export default connect(null, mapDispatchToProps)(HomePage)
