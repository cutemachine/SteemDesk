import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Page, { Grid, GridColumn } from '@atlaskit/page'
import ErrorIcon from '@atlaskit/icon/glyph/error'
import Banner from '@atlaskit/banner'
import { steemSelectors } from '../state/steem'
import PageHeaderWithUserInput from '../components/PageHeaderWithUserInput'
import ContentWrapper from '../components/ContentWrapper'
import Level from '../components/Level'
import LevelItem from '../components/LevelItem'
import Heading from '../components/Heading'
import Title from '../components/Title'

class Dashboard extends Component {
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
          <PageHeaderWithUserInput title='Dashboard' />
          <Grid layout='fluid'>
            <GridColumn medium={6}>
              <Level>
                <LevelItem>
                  <Heading>Steem</Heading>
                  <Title>2.94</Title>
                </LevelItem>
              </Level>
            </GridColumn>
            <GridColumn medium={6}>
              <Level>
                <LevelItem>
                  <Heading>SBD</Heading>
                  <Title>3.03</Title>
                </LevelItem>
              </Level>
            </GridColumn>
            <GridColumn medium={4}>
              <Level>
                <LevelItem>
                  <Heading>Reputation</Heading>
                  <Title>{this.props.reputation}</Title>
                </LevelItem>
              </Level>
            </GridColumn>
            <GridColumn medium={4}>
              <Level>
                <LevelItem>
                  <Heading>Followers</Heading>
                  <Title>{this.props.followCount.follower_count}</Title>
                </LevelItem>
              </Level>
            </GridColumn>
            <GridColumn medium={4}>
              <Level>
                <LevelItem>
                  <Heading>Following</Heading>
                  <Title>{this.props.followCount.following_count}</Title>
                </LevelItem>
              </Level>
            </GridColumn>
          </Grid>
        </Page>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const reputation = steemSelectors.selectReputation(state)
  const followCount = steemSelectors.selectFollowCount(state)
  const errorMessage = steemSelectors.selectErrorMessage(state)

  return { reputation, followCount, errorMessage }
}

export default connect(mapStateToProps)(Dashboard)
