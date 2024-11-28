import { useNavigate } from 'react-router'
import { getCodeById, loadCodes } from '../store/actions/code.action'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function HomePage() {
  const navigae = useNavigate()
  const codes = useSelector((state) => {
    console.log('Current state:', state)
    return state.codeModule.codes
  })

  useEffect(() => {
    loadCodes()
  }, [])

  function navTo() {
    navigae('/start')
  }
  if (!codes) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>Choose code block</h1>
      <ul>
        {codes.map((code) => (
          <li key={code.id}>{code.title}</li>
        ))}
      </ul>
      <button onClick={navTo}>Nav To</button>
    </div>
  )
}
