var scroreLeftWrist = 0;
var leftWristX = 0;
var leftWristY =0;
var scorerightWrist = 0;
var rightWristX = 0;
var rightWristY = 0;

song = ""

function preload(){
    song = loadSound("music.mp3")
}

function setup(){
    canvas = createCanvas(600, 400)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    classifier = ml5.poseNet(video, modelLoaded)
    classifier.on('pose', gotPoses)
   
}

function modelLoaded(){
    console.log("Model is Loaded")
}

function gotPoses(results){
    if(results.length > 0){
        
        console.log(results)
         scroreLeftWrist = results[0].pose.keypoints[9].score
         leftWristX = results[0].pose.leftWrist.x
         leftWristY = results[0].pose.leftWrist.y
         scorerightWrist = results[0].pose.keypoints[10].score
         rightWristX = results[0].pose.rightWrist.x
         rightWristX = results[0].pose.rightWrist.y
    }
}

function draw(){
    image(video, 0, 0, 640, 480)
    fill(255, 0, 0)
    stroke(255, 0, 0)
    //  if(scroreLeftWrist == 0.2){
         
        circle(leftWristX, leftWristY, 20)
        lWY_div_500 = floor(leftWristX/500)
        document.getElementById("volume-h3").innerHTML = lWY_div_500
        song.setVolume(lWY_div_500)

    //  }

    //  if(scorerightWrist == 0.2){
        circle(rightWristX, rightWristY, 20)

        if(rightWristY > 0 && rightWristY < 100){
            song.rate(0.5)
            document.getElementById("speed-h3").innerHTML = "0.5x"
         }else if(rightWristY > 100 && rightWristY < 200){
             document.getElementById("speed-h3").innerHTML = "1x"
             song.rate(1)
         }else if(rightWristY > 200 && rightWristY < 300){
            document.getElementById("speed-h3").innerHTML = "1.5x"
            song.rate(1.5)
     }else if(rightWristY > 300 && rightWristY < 400){
        document.getElementById("speed-h3").innerHTML = "2x"
        song.rate(2) 
        }else if(rightWristY > 400){
            song.rate(2.5)
            document.getElementById("speed-h3").innerHTML = "2x"
        }

    // }
}
function playSong(){
    song.play()
}

