var visualizationSelector = document.getElementById('visualization');
var visualization = visualizationSelector.value;
visualizationSelector.addEventListener('change', function() {
    visualization = visualizationSelector.value;
});

var context = new window.AudioContext();
var audioElement = document.querySelector('#source');
var analyser = context.createAnalyser();
analyser.smoothingTimeConstant = 0;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

var source = context.createMediaElementSource(audioElement);
source.connect(analyser).connect(context.destination);

audioElement.addEventListener("play", function() {
    if (context.state == "suspended") {
        context.resume();
    }
});

var visualizer = document.getElementById('visualizer');
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

    var barWidth = (500 / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        visualizerCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        visualizerCtx.fillRect(x, 500 - barHeight, barWidth, barHeight);

        x += barWidth + 1;
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