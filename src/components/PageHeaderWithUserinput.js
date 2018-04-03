import React from 'react'
import PageHeader from '@atlaskit/page-header'
import UsernameInput from './UsernameInput'

const actionsContent = (
  <UsernameInput />
)

const PageHeaderWithUserinput = ({title}) => (
  <PageHeader
    breadcrumbs={null}
    actions={actionsContent}
    bottomBar={null}
  >
    {title}
  </PageHeader>
)

export default PageHeaderWithUserinput
