import { Outlet, useLocation, useNavigate } from 'react-router-dom'

function AppLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleToggle = () => {
    if (pathname === '/') {
      navigate('/about')
    } else {
      navigate('/')
    }
  }

  function handleLink(e) {
    const content = e.target.textContent.trim().toLowerCase()

    navigate(`/${content}`)
  }

  return (
    <>
      <div onClick={e => handleLink(e)}>
        <button style={{ marginRight: '8px' }}>Home</button>
        <button style={{ marginRight: '8px' }}>About </button>
        <button style={{ marginRight: '8px' }}>Counter</button>
        <button style={{ marginRight: '8px' }}>Form</button>
      </div>
      <button onClick={handleToggle}>Toggle</button>
      <Outlet></Outlet>
    </>
  )
}

export default AppLayout
