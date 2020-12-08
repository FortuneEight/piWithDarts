const diameter = 800;
const dartDiameter = 1;
const colorCircle = "red";
const colorSquare = "black";
const batchCount = 1000;
const minConstraint = 3.1415;
const maxConstraint = 3.1416;
const minDartConstraint = 50000;
const maxDartConstraint = 5000000;
// const fs = require('fs');
let seed; // 169, 120509, 8

let dartCount;
let dartsInCircle;
let piDiv;
let piPercentDeviation;
let piSimulated;
let randomMethod;
let dataDic;
let cvs;
let id;
let repeats;

function initialize() {
    dartCount = 0;
    dartsInCircle = 0;
    piDiv = null;
    randomMethod = goodLinearCongruential;
    repeats = 2;
}

function setup() {
    initialize();
    if (id == null) {
        cvs = createCanvas(diameter, diameter);
        dataDic = createStringDict();
        id = 0;
    } else if (cvs == null) {
        cvs = createCanvas(diameter, diameter);
        dataDic = createStringDict();
        id = id;
    }
    background(220);
    stroke(colorCircle);
    strokeWeight(1);
    circle(diameter / 2, diameter / 2, diameter);
    piDiv = createDiv().style('font-size', '12pt');
    seed = randomP5js(0, diameter * diameter);
    frameRate(15)
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
            stroke(colorSquare);
        }

        point(x, y);

        // nf(((dartsInCircle / dartCount) * 4), 1, 5);
        piSimulated = ((dartsInCircle / dartCount) * 4);
        piPercentDeviation = ((piSimulated - PI) / PI) * 100;
        if ((piSimulated > minConstraint && piSimulated < maxConstraint && dartCount > minDartConstraint) || dartCount > maxDartConstraint) {
            // sleep(2000);
            // fs.appendFileSync('records.txt', 'data to append');
            // piDiv.html(``);
            // initialize();
            // background(220);
            // stroke(colorCircle);
            // strokeWeight(1);
            // circle(diameter / 2, diameter / 2, diameter);
            // piDiv = createDiv().style('font-size', '12pt');
            dataDic.create(id % repeats, `${piSimulated},${dartCount}`);
            id++;
            setup();

            if (id % repeats >= repeats - 1) {
                dataDic.saveTable(`results - ${randomMethod.toString().substring(randomMethod.toString().indexOf(' '), randomMethod.toString().indexOf('('))} - ${Math.floor(id / repeats).toString().padStart(3, '0')}`);
                cvs = null;
            }
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
                &nbsp;Random Method .......${randomMethod.toString().substring(randomMethod.toString().indexOf(' '), randomMethod.toString().indexOf('('))}<br>
                &nbsp;Frame Rate ............... ${frameRate()}`);
}

function randomP5js(min, max) {
    return random(min, max);
}

function goodLinearCongruential(min, max) {
    // Next term = (prev. term x multiplier + adder) mod modulus.
    mul = 12387;
    add = 923487;

    oldSeed = seed;
    seed = (oldSeed * mul + add) % max;
    return seed;
}

function badLinearCongruential(min, max) {
    // Next term = (prev. term x multiplier + adder) mod modulus.
    mul = 99;
    add = 0;

    oldSeed = seed;
    seed = (oldSeed * mul + add) % max;
    return seed;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}