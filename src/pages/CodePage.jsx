import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Editor from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import { loadCode } from '../store/actions/code.action'
import { socketService } from '../services/socket.service'

export function CodePage() {
  const { id } = useParams()
  const code = useSelector((state) => state.codeModule.code)
  const navigte = useNavigate()
  const handleClose = () => setOpen(false)

  const [open, setOpen] = React.useState(false)
  const [modalContent, setModalContent] = useState({
    text: '',
    icon: '',
  })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  const [role, setRole] = useState('')
  const [roomStatus, setRoomStatus] = useState({
    isStudentPresent: false,
    watcherCount: 0,
  })

  const [userCode, setUserCode] = useState('')
  const [solution, setSolution] = useState(false)

  useEffect(() => {
    loadCode(id)
  }, [id])

  useEffect(() => {
    socketService.emit('join-room', id)

    socketService.on('user-role', setRole)
    socketService.on('room-status', setRoomStatus)
    socketService.on('code-changed', (newCode) => {
      setUserCode(newCode)
    })

    return () => {
      socketService.emit('disconnect-from-room')
      socketService.off('user-role')
      socketService.off('room-status')
      socketService.off('code-changed')
    }
  }, [id])

  function onSolution() {
    setSolution(!solution)
  }

  function handleEditorChange(value) {
    console.log('vale:', value)

    setUserCode(value)
    console.log('usercode:', userCode)
  }
  socketService.emit('code-update', id, userCode)

  function onBackToLobby() {
    socketService.on('redirect-to-lobby', () => {
      navigte('/')
    })
    socketService.emit('disconnect-from-room')
    navigte('/')
  }

  function handleRunCode() {
    // Retrieve the test cases from the code object.
    const testCases = code.testCases

    try {
      // Convert the user's code string into an executable function using eval.
      console.log('user-code:', userCode)

      const userFunction = eval(`(${userCode})`)

      if (typeof userFunction !== 'function') {
        setModalContent({
          text: 'The code is not a valid function. Please review it and try again.',
        })
        setOpen(true)
        return
      }
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
            setModalContent({
              icon: '😊',
              text: 'Great job!🎊',
            })
            setOpen(true)
          } else {
            setModalContent({
              icon: 'Incorrect solution 😓',
              text: 'Keep going, hard work pays off!',
            })
            setOpen(true)
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
          {role === 'mentor' && (
            <p>
              <strong>Student Present:</strong>{' '}
              {roomStatus.isStudentPresent ? 'Yes' : 'No'}
            </p>
          )}
          {role === 'student' && (
            <p>
              <strong>Mentor Present:</strong>{' '}
              {roomStatus.isMentor ? 'Yes' : 'No'}
            </p>
          )}

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
          options={{ readOnly: role !== 'student' }}
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
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalContent.icon}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalContent.text}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  )
}
