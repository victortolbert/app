import io from 'socket.io-client'
const socket = io(process.env.wsURL)

export default socket
