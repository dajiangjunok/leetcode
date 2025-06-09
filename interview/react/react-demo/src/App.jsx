import { useState, useEffect, createContext } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
  Link
} from 'react-router-dom'
import routes from '../routes/index.js'
import AppLayout from './AppLayout'

import { useSelector } from 'react-redux'

const ThemeContext = createContext(null)

function App() {
  const counter = useSelector(state => state.counter.value)

  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={theme}>
      <h2>{counter}</h2>
      <BrowserRouter>
        <Routes>
          <Route Component={AppLayout}>
            {routes.map(item => {
              return (
                <Route
                  path={item.path}
                  Component={item.component}
                  key={item.name}
                ></Route>
              )
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}
export { ThemeContext }
export default App
