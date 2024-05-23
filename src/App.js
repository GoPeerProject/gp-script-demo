import { useEffect, useState } from 'react'
import axios from 'axios'
import logo from './logo.svg'
import './App.css'

let theme = 'dark'

function App() {
  const [org, setOrg] = useState('')
  const [key, setKey] = useState('')
  const [token, setToken] = useState('')
  const [launched, setLaunched] = useState(false)

  // Org id and key are stored in localStorage, just enter your
  // credentials in the inputs when you run 'npm start'
  useEffect(() => {
    const gpPmid = localStorage.getItem('gp-pmid') ?? ''
    const gpKey = localStorage.getItem('gp-key') ?? ''
    if (gpPmid !== org) setOrg(gpPmid)
    if (gpKey !== key) setKey(gpKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetch the token from the GoPeer API
  // NOTE: This token should not be retrieved on the front-end,
  // this is just an example
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

  // This logic (aside from launch()) can be done before the button
  // click itself, it is setup like this here for testing purposes
  const launch = () => {
    const gP = window.gP
    // set environment and token
    gP.setEnv('dev')
    gP.setToken(token)

    // auth user
    gP.identify({
      userId: '12345678',
      firstName: 'John',
      lastName: 'Doe'
    })

    // Optional (but HIGHLY recommended): send along a link to the
    // student's material that the tutor can access
    gP.setLinks([
      {
        text: 'link to students gradebook page',
        title: 'Gradebook',
        url: 'https://r19.core.learn.edgenuity.com/Educator/StudentTools/Gradebook.aspx?deeplink=true&courseID=3fe068f7-2019-428b-840a-bb93913251e6&stuId=206465686&lmsSchId=18152'
      }
    ])

    // launch() only needs to be used with a custom button
    // if using show(), you do not need to do this
    gP.launch()
    setLaunched(true)
  }

  // If the student enters an exam/assessment, it is very simple to
  // notify GoPeer that they have done so, you just need the same
  // user Id you auth'd them with originally and the same API token
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
        {token && <button onClick={launch}>Launch</button>}
        {launched && <button onClick={sendEvent}>Send Event</button>}
      </div>
    </div>
  )
}

export default App
