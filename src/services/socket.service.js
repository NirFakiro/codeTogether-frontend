import io from 'socket.io-client'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3000'

export const socketService = createSocketService()

socketService.setup()

function createSocketService() {
  var socket = null

  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },

    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    },
  }

  return socketService
}
