const select=document.querySelector('#select')
const male=document.querySelector('#male')
const female=document.querySelector('#female')
const imageFile=document.querySelector('#image-file')
const videoFile=document.querySelector('#video-file')
const submit=document.querySelector('#submit')
const imageContainer=document.querySelector('.image-container')
const videoContainer=document.querySelector('.video-container')
const arrFiles=[]
imageFile.addEventListener('change',(e)=>{
    const loadedImage=e.target.files[0]
    const reader=new FileReader()
    reader.readAsDataURL(loadedImage)
    reader.onload=(ev)=>{
        const image=new Image(100,100)
        image.src=reader.result
        imageContainer.appendChild(image)
        const imageObj={
            name:"lodaded-image",
            src:reader.result
        }
        arrFiles.push(imageObj)
    }
})

videoFile.addEventListener('change',(e)=>{
    const loadedVideo=videoFile.files[0]
    const reader=new FileReader()
    reader.readAsDataURL(loadedVideo)
    reader.onload=(ev)=>{
        const video=document.createElement('video')
        video.width=200
        video.height=200
        video.controls=true
        video.src=reader.result
        videoContainer.appendChild(video)
        const videoObj={
            name:"loaded-video",
            src:reader.result
        }
        arrFiles.push(videoObj)
    }
})


submit.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log(arrFiles)
})
