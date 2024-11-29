import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Editor from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { loadCode } from '../store/actions/code.action'
import { socketService } from '../services/socket.service'

export function CodePage() {
  const { id } = useParams()
  const code = useSelector((state) => state.codeModule.code)

  const [role, setRole] = useState('')
  const [roomStatus, setRoomStatus] = useState({
    isStudentPresent: false,
    watcherCount: 0,
  })
  const navigte = useNavigate()

  const [userCode, setUserCode] = useState('')
  const [solution, setSolution] = useState(false)

  useEffect(() => {
    loadCode(id)
  }, [id])

  useEffect(() => {
    socketService.emit('join-room', id)

    socketService.on('user-role', setRole)
    socketService.on('room-status', setRoomStatus)

    return () => {
      socketService.emit('disconnect-from-room')
      socketService.off('user-role')
      socketService.off('watcher-count')
    }
  }, [id])

  function onSolution() {
    setSolution(!solution)
  }

  function handleEditorChange(value) {
    setUserCode(value)
  }

  function onBackToLobby() {
    socketService.emit('disconnect-from-room')
    navigte('/')
  }

  function handleRunCode() {
    // Retrieve the test cases from the code object.
    const testCases = code.testCases

    try {
      // Convert the user's code string into an executable function using eval.
      const userFunction = eval(`(${userCode})`)

      // Itreate over all the test cases to evaluete the user's code.
      for (const testCase of testCases) {
        const input = testCase.input
        const expectedOutput = testCase.output

        try {
          // If the input is not an array, wrap it in an array
          const preparedInput = Array.isArray(input) ? input : [input]

          const result = userFunction(...preparedInput)

          // Compate the result to the expected output
          if (JSON.stringify(result) === JSON.stringify(expectedOutput)) {
            alert('Correct solution')
          } else {
            alert(
              `Incorrect solution. Expected: ${expectedOutput}, Got: ${result}`
            )
          }
        } catch (innerErr) {
          alert(`Error during execution: ${innerErr.message}`)
        }
      }
    } catch (err) {
      alert(`Error creating function: ${err.message}`)
    }
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
        <div className="flex">
          <p>
            <strong>Your role:</strong> {role}
          </p>
          <p>
            <strong>Student Present:</strong>{' '}
            {roomStatus.isStudentPresent ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Viewers:</strong> {roomStatus.watcherCount}
          </p>
        </div>
        <Editor
          height="50vh"
          defaultLanguage="javascript"
          automaticLayout={true}
          value={code.starterCode}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
        <div className="btn-container">
          <div className="left-buttons">
            <button className="btn-primary" onClick={onBackToLobby}>
              Back to Lobby
            </button>
            <button className="btn-primary" onClick={onSolution}>
              {solution ? 'Hide solution' : 'Solution'}
            </button>
          </div>
          <button className="btn-primary" onClick={handleRunCode}>
            Run
          </button>
        </div>
        {solution && <p className="solution-text">{code.solution}</p>}
      </div>
    </div>
  )
}
