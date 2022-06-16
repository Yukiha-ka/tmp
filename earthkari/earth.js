
let angle = 0;
let tex;
let earth;
// let theta;

function preload() {
    earth = loadImage('earth.jpg');
}

function setup() {
    createCanvas(1000, 1000, WEBGL);
    angleMode(DEGREES);
    noStroke();
    tex = earth;
    }

function draw() {
    // background(0);
	translate(0,0,0);// 座標の変更（x,y,z）
    texture(tex);
    ambientLight(100);
    directionalLight(255, 255, 255, 1, 1, 0);
    pointLight(255, 255, 255, -50, -50, 150);
    // rotateY(angle + 0.3);
    // rotateZ(-23.4);
    // if (mouseIsPressed) {
    //     rotateX(map(mouseY, 0, height, PI*20, -PI*20));
    //     rotateY(map(mouseX, 0, width, -PI*20, PI*20));
	// }
    orbitControl(PI,PI,PI)
    sphere(200);// （）の中は大きさの数字

    
    // angle += 0.3;

}