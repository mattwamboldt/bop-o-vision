import * as React from "react";
import * as ReactDOM from "react-dom";

import App from './components/app';

const playTrack = (path: string) => {
    var audioSourceElement = document.querySelector('#audioSource') as HTMLSourceElement;
    audioSourceElement.src = path;
    var audioElement: HTMLAudioElement = document.querySelector('#audio');
    audioElement.load();
    audioElement.play();
}

var visualization = 'time';
const setVisualization = (id: string) => {
    visualization = id;
}

ReactDOM.render(
    <App onTrackChange={playTrack} onVisualizationChange={setVisualization} />,
    document.getElementById("app")
);

var context = new window.AudioContext();
var analyser = context.createAnalyser();
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

var audioElement: HTMLAudioElement = document.querySelector('#audio');
var source = context.createMediaElementSource(audioElement);
source.connect(analyser).connect(context.destination);

audioElement.addEventListener("play", function() {
    if (context.state == "suspended") {
        context.resume();
    }
});

var visualizer = document.getElementById('visualizer') as HTMLCanvasElement;
var visualizerCtx = visualizer.getContext("2d");

// INitial 2 visualizations
function drawTime() {
    analyser.getByteTimeDomainData(dataArray);

    visualizerCtx.lineWidth = 4;
    visualizerCtx.strokeStyle = "blue";
    visualizerCtx.beginPath();

    var sliceWidth = visualizer.width * 1.0 / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * visualizer.height / 2;

        if (i === 0) {
            visualizerCtx.moveTo(x, y);
        } else {
            visualizerCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    visualizerCtx.lineTo(visualizer.width, visualizer.height / 2);
    visualizerCtx.stroke();
}

function drawFrequency() {
    analyser.getByteFrequencyData(dataArray);

    var barWidth = 1;
    var numBars = visualizer.width / barWidth;

    var binsPerBar = Math.floor(bufferLength / numBars);
    var barHeight = 0;
    var x = 0;
    var numBins = 0;

    for (var i = 0; i < bufferLength; i++) {
        barHeight += dataArray[i];
        numBins += 1;
        if (numBins >= binsPerBar) {
            barHeight /= numBins;
            visualizerCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
            visualizerCtx.fillRect(x, visualizer.height - barHeight, barWidth, visualizer.height);
            x += barWidth + 1;
            numBins = 0;
            barHeight = 0;
        }
    }
}

function drawCircle() {
    analyser.getByteTimeDomainData(dataArray);

    visualizerCtx.lineWidth = 4;
    visualizerCtx.strokeStyle = "blue";
    visualizerCtx.beginPath();

    var cx = visualizer.width / 2.0;
    var cy = visualizer.height / 2.0;
    var radius = 50.0;
    var range = 30.0;

    var startx = 0;
    var starty = 0;

    for (var i = 0; i < bufferLength; i++) {
        var t = (i / bufferLength) * Math.PI * 2.0;
        var v = dataArray[i] / 128.0;
        var r = radius + v * range;
        var x = cx + Math.cos(t) * r;
        var y = cy + Math.sin(t) * r;

        if (i === 0) {
            visualizerCtx.moveTo(x, y);
            startx = x;
            starty = y;
        } else {
            visualizerCtx.lineTo(x, y);
        }
    }

    visualizerCtx.lineTo(startx, starty);
    visualizerCtx.stroke();
}

function draw() {
    requestAnimationFrame(draw);

    visualizerCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    visualizerCtx.fillRect(0, 0, visualizer.width, visualizer.height);

    if (visualization == 'time') {
        drawTime();
    } else if (visualization == 'frequency') {
        drawFrequency();
    } else if (visualization == 'circle') {
        drawCircle();
    }
}

draw();