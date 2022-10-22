const camVideo=document.querySelector('#cam-video')
const openCameraBtn=document.querySelector('#open-camera')
const startRecord=document.querySelector('#start-record')
const stopRecord=document.querySelector('#stop-record')
const takeSnap=document.querySelector('#take-snap')
const recorderVideoContainer=document.querySelector('.recorder-video-container')
const snapPhotoContanier=document.querySelector('.snap-image-container')
const getVideoBtn=document.querySelector('#get-video')
const dbDiv=document.querySelector('.db')

const chunks=[]

startRecord.style.display="none"
stopRecord.style.display="none"
takeSnap.style.display="none"
////////////////////////////////////////////////////////////////
const openCamera=async()=>{
    const constraints={
        video: {
            width: {
              min: 1280,
              ideal: 1920,
              max: 2560,
            },
            height: {
              min: 720,
              ideal: 1080,
              max: 1440
            },
            facingMode: 'environment'
          },
        audio:true
    }
    const stream=await navigator.mediaDevices.getUserMedia(constraints)
    camVideo.srcObject=stream
    camVideo.muted=true
    camVideo.play()

    startRecord.style.display="inline-block"
    stopRecord.style.display="inline-block"
    takeSnap.style.display="inline-block"

    const mediarecorder=new MediaRecorder(stream)
    startRecord.onclick=(e)=>{
        e.target.style.backgroundColor ="red"
        stopRecord.style.backgroundColor ="green"
        mediarecorder.start()
    }
    stopRecord.onclick=(e)=>{
        e.target.style.backgroundColor ="red"
        startRecord.style.backgroundColor ="green"
        mediarecorder.stop()
    }
    mediarecorder.ondataavailable=(e)=>{
        chunks.push(e.data)
    }
    mediarecorder.onstop=(e)=>{
        const blob=new Blob(chunks)
        const recordedVideoSrc=URL.createObjectURL(blob)
        const video=document.createElement('video')
        video.width=200
        video.height=200
        video.controls=true
        video.src=recordedVideoSrc
        recorderVideoContainer.appendChild(video)
        const videoObj={
            name:"recorded-video",
            src:recordedVideoSrc
        }
        arrFiles.push(videoObj)
    }
    takeSnap.addEventListener('click',(e)=>{
        const canvas=document.createElement('canvas')
        canvas.width=200
        canvas.height=200
        const context =canvas.getContext('2d')
        context.drawImage(camVideo,0,0,canvas.width,canvas.height)
        snapPhotoContanier.appendChild(canvas)
        const snappedPhotoSrc=canvas.toDataURL()
        const imageObj={
            name:"snapped-image",
            src:snappedPhotoSrc
        }
        arrFiles.push(imageObj)
    })
}
openCameraBtn.addEventListener('click',openCamera)
////////////////////////////////////////////////////////////////
getVideoBtn.addEventListener('click', async(e)=>{
    dbDiv.innerHTML=""
    const response=await fetch('./db/vid_5.mp4')
    const blob=await response.blob()
    const dbVideoSrc=URL.createObjectURL(blob)
    const dbVideo=document.createElement('video')
    dbVideo.width=300
    dbVideo.height=300
    dbVideo.controls=true
    dbVideo.src=dbVideoSrc
    dbDiv.appendChild(dbVideo)
})




















