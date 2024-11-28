import { useNavigate } from 'react-router'
import { getCodeById, loadCodes } from '../store/actions/code.action'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SET_CODE } from '../store/reducers/code.reducer'
import { store } from '../store/store'

export function HomePage() {
  const navigae = useNavigate()
  const codes = useSelector((state) => state.codeModule.codes)

  useEffect(() => {
    loadCodes()
  }, [])

  function onOpenCodeBlock(codeId) {
    getCodeById(codeId)
      .then((code) => {
        store.dispatch({ type: SET_CODE, code })
        navigae(`/code/${codeId}`)
      })
      .catch((err) => {
        console.error('Failed to fetch code:', err)
      })
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
