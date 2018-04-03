import React from 'react'
import PageHeader from '@atlaskit/page-header'
import UserInput from './UserInput'

const actionsContent = (
  <UserInput />
)

const PageHeaderWithUserInput = ({title}) => (
  <PageHeader
    breadcrumbs={null}
    actions={actionsContent}
    bottomBar={null}
  >
    {title}
  </PageHeader>
)

export default PageHeaderWithUserInput
