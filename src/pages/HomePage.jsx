import { useNavigate } from 'react-router'
import { getCodeById, loadCodes } from '../store/actions/code.action'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function HomePage() {
  const navigae = useNavigate()
  const codes = useSelector((state) => {
    return state.codeModule.codes
  })

  useEffect(() => {
    loadCodes()
  }, [])

  if (!codes) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1 className="title">Choose code block</h1>
      <div className="flex ">
        {codes.map((code) => (
          <div key={code.id} className="card">
            <div className="card-header">
              <h2>{code.title}</h2>
              <span className={`level ${code.level.toLowerCase()}`}>
                {code.level}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
