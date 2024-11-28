import { useNavigate } from 'react-router'

export function HomePage() {
  const navigae = useNavigate()

  function navTo() {
    navigae('/start')
  }
  return (
    <div>
      <h1>Welcome to Moveo App</h1>
      <button onClick={navTo}>Nav To</button>
    </div>
  )
}
