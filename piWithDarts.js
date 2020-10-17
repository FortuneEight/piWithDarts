const diameter = 500;
const dartDiameter = 1;
const colorCircle = "red";
const colorSquare = "black";
const batchCount = 10000;
const minConstraint = 3.14;
const maxConstraint = 3.15;
const minDartConstraint = diameter * diameter;
const seed = null; // 169, 120509, 8

let dartCount;
let dartsInCircle;
let piDiv;
let piPercentDeviation;
let piSimulated;
let randomMethod;

function initialize() {
    dartCount = 0;
    dartsInCircle = 0;
    piDiv = null;
    piPercentDeviation = null;
    piSimulated = null;
    randomMethod = randomP5js;
    randomSeed(seed);
}

function setup() {
    initialize();
    createCanvas(diameter, diameter);
    background(220);
    stroke(colorCircle);
    strokeWeight(1);
    circle(diameter / 2, diameter / 2, diameter);
    piDiv = createDiv().style('font-size', '12pt');
}

function draw() {
    generateDarts(batchCount);
    numericOutput();
}

function generateDarts(bc) {
    const radius = diameter / 2;
    strokeWeight(dartDiameter);

    for (let i = 0; i < bc; i++) {
        let x = randomMethod(0, diameter);
        let y = randomMethod(0, diameter);
        dartCount++;
        if (dist(x, y, radius, radius) < radius) {
            stroke(colorCircle);
            dartsInCircle++;
        } else {
            stroke(colorSquare)
        }

        point(x, y);

        // nf(((dartsInCircle / dartCount) * 4), 1, 5);
        piSimulated = ((dartsInCircle / dartCount) * 4);
        piPercentDeviation = ((piSimulated - PI) / PI) * 100;
        if (piSimulated > minConstraint && piSimulated < maxConstraint && dartCount > minDartConstraint) {
            noLoop();
            break;
        }
    }
}

function numericOutput() {
    piDiv.html(`<br> &nbsp;Diameter ....................${diameter} <br>
                &nbsp;Min Dart Count ........ ${minDartConstraint} <br>
                &nbsp;Dart Count .................${dartCount} <br>
                &nbsp;Darts In Circle ..........${dartsInCircle} <br>
                &nbsp;Simulated Pi .............${nf(piSimulated, 1, 9)} <br>
                &nbsp;Percent Deviation .....${nf(piPercentDeviation, 1, 9)}% <br>
                &nbsp;Random Method .......${randomMethod.toString().substring(0, randomMethod.toString().indexOf('{'))} - ${seed}`);
}

function randomP5js(min, max) {
    return random(min, max);
}

function randomBad(min, max) {
    return random(min, max);
}