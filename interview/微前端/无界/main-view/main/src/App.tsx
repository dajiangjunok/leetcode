import WujieReact from 'wujie-react'

function App() {
  return (
    <>
      <header></header>
      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}
        className="sub-demo"
      >
        <div>
          <WujieReact
            width="100%"
            height="100%"
            name="vue-demo"
            url="http://localhost:5173/"
          ></WujieReact>
        </div>
        <div>
          <WujieReact
            width="100%"
            height="100%"
            name="react-demo"
            url="http://localhost:5175/"
          ></WujieReact>
        </div>
      </div>
      <footer></footer>
    </>
  )
}

export default App
