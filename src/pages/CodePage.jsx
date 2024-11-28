import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export function CodePage() {
  const navigte = useNavigate()
  const code = useSelector((state) => state.codeModule.code)

  console.log(code)

  function onBackToLobby() {
    navigte('/')
  }
  if (!code) return <div>Loading code...</div>
  return (
    <div className="code-page">
      <div className="code-description">
        <h3 className="fs20 ">{code.title}</h3>
        <p className="fs14-description">{code.description}</p>

        <div className="example">
          <h4 className="fs18">Example:</h4>
          <p>
            <strong>Explanation:</strong> {code.example.explanation}
          </p>
          <p>
            <strong>Input:</strong> {JSON.stringify(code.example.input)}
          </p>
          <p>
            <strong>Output:</strong> {code.example.output}
          </p>
        </div>
      </div>

      <div className="code-editor">
        <textarea
          className="starter-code"
          defaultValue={code.starterCode}
        ></textarea>

        <button className="btn-primary" onClick={onBackToLobby}>
          Back to Lobby
        </button>
      </div>
    </div>
  )
}
