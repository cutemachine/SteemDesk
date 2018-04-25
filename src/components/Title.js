import styled from 'styled-components'

const subSize = '0.75em'
const supSize = '0.75em'

const Title = styled.p`
  word-break: break-word;
  em,
  span
    font-weight: inherit;
  sub
    font-size: ${props => props.subSize || subSize};
  sup
    font-size: ${props => props.supSize || supSize};
  .tag
    vertical-align: middle;
  color: ${props => props.color || props.theme.greyDarker};
  font-size: ${props => props.size || props.theme.size3};
  font-weight: ${props => props.weight || props.theme.weightSemibold};
  line-height: ${props => props.lineHeight || props.theme.lineHeight};
  strong
    color: ${props => props.strongColor || props.theme.strongColor};
    font-weight: ${props => props.strongWeight || props.theme.strongWeight};
`

export default Title
