import { ThemeContext } from '../../App'
import { useContext } from 'react'

function About() {
  const theme = useContext(ThemeContext)
  return (
    <>
      <h1>welcome About</h1>
      {/* <ThemeContext.Consumer>
        {theme => {
          return <span>{theme}</span>
        }}
      </ThemeContext.Consumer> */}
      <span>{theme}</span>
    </>
  )
}

export default About
