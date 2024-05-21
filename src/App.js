import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

let theme = 'dark'

function App() {
  const [org, setOrg] = useState('')
  const [key, setKey] = useState('')
  const [token, setToken] = useState('')
  const [launched, setLaunched] = useState(false)

  useEffect(() => {
    const gpPmid = localStorage.getItem('gp-pmid') ?? ''
    const gpKey = localStorage.getItem('gp-key') ?? ''
    if (gpPmid !== org) setOrg(gpPmid)
    if (gpKey !== key) setKey(gpKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadToken = async () => {
    try {
      const res = await axios.post(
        'https://dev.gopeer.org/organizations/identify',
        { orgId: org, key }
      )
      setToken(res.data.token)
    } catch (e) {
      console.log(e)
    }
  }

  const showButton = () => {
    const gP = window.gP
    // setup env
    gP.setEnv('dev')
    gP.setToken(token)

    // auth user
    gP.identify({
      userId: '12345678',
      firstName: 'John',
      lastName: 'Doe'
    })

    // show and position widget
    gP.show()
    gP.setButtonStyles({ bottom: '50px', right: 'calc(50% - 85px)' })

    // gP.setPosition({ bottom: 50, right: 500 });
    setLaunched(true)
  }

  const sendEvent = async () => {
    try {
      const res = await axios.post(
        `https://dev.gopeer.org/users/event?userId=12345678&type=entered_assessment&token=${token}`
      )
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div
          onClick={() => {
            const nextTheme = theme === 'dark' ? 'light' : 'dark'

            window.gP.setTheme(nextTheme)
            theme = nextTheme
          }}
        >
          <img src={logo} className='App-logo' alt='logo' />
        </div>
      </header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
          alignItems: 'center'
        }}
      >
        Platform
        <input
          placeholder='Set platform'
          value={org}
          onChange={(e) => {
            setOrg(e.target.value)
            localStorage.setItem('gp-pmid', e.target.value)
          }}
        />
        Key
        <input
          placeholder='Set key'
          value={key}
          onChange={(e) => {
            setKey(e.target.value)
            localStorage.setItem('gp-key', e.target.value)
          }}
        />
        <button onClick={loadToken}>Load Token</button>
        {token && <button onClick={showButton}>Show Button</button>}
        {launched && <button onClick={sendEvent}>Send Event</button>}
      </div>
    </div>
  )
}

export default App
