const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})
const myVideo = document.createElement('video')
myVideo.muted = true

navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
}).then(stream => {
    addVideoStream(myVideo, stream)
}).catch(err => {
    alert('erro ai')
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})
socket.emit('join-room', ROOM_ID, 10)
socket.on('user-connected', userId => {
    console.log('User conneted: ' + userId)
})

function addVideoStream (video, stream) {
    console.log(stream)
    video.srcObject = stream
    video.addEventListener('loadedMetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}