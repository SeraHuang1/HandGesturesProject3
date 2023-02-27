prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/E3TcOTiej/',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifer.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "letter E"){
            document.getElementById("update_emoji").innerHTML = "&#9994;";
        }
        if(results[0].label == "seperate fingers"){
            document.getElementById("update_emoji").innerHTML = "&#128406;";
        }
        if(results[0].label == "ok"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[1].label == "letter E"){
            document.getElementById("update_emoji2").innerHTML = "&#9994;";
        }
        if(results[1].label == "seperate fingers"){
            document.getElementById("update_emoji2").innerHTML = "&#128406;"
        }
        if(results[1].label == "ok"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;"
        }
    }


}

