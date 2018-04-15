import React from 'react'
import PageHeader from '@atlaskit/page-header'
import UserInput from './UserInput'

const actionsContent = (
  <UserInput />
)

const PageHeaderWithUserInput = ({title, breadcrumbs = null, bottomBar = null}) => (
  <PageHeader
    breadcrumbs={breadcrumbs}
    actions={actionsContent}
    bottomBar={bottomBar}
  >
    {title}
  </PageHeader>
)

export default PageHeaderWithUserInput
