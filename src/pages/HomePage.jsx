import { useNavigate } from 'react-router'
import { loadCodes } from '../store/actions/code.action'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function HomePage() {
  const navigae = useNavigate()
  const codes = useSelector((state) => state.codeModule.codes)

  useEffect(() => {
    loadCodes()
  }, [])

  function onOpenCodeBlock(codeId) {
    navigae(`/code/${codeId}`)
  }

  if (!codes) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1 className="title">Choose code block</h1>
      <div className="flex ">
        {codes.map((code) => (
          <div key={code._id} className="card">
            <div
              onClick={() => onOpenCodeBlock(code._id)}
              className="card-header"
            >
              <h2>{code.title}</h2>
              <span className={`level ${code.level}`}>{code.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
