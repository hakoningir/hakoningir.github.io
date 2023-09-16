var canvas;
var gl;
var sideWalkBuffer;
var colorSidewalk = vec4(0,0,0,1);
var carBuffer;
var colorCars = vec4(1,0,0,1);
var frogBuffer;
var colorFrog = vec4(0,1,0,1)
var vPosition;
var frogLoc = [
    vec2( 0,   -0.8 ),
    vec2( 0.1, -0.9 ),
    vec2(-0.1, -0.9 )];
var sideWalk = [];
var cars = [];
var color;
var carsInRow = 3;
var collision = false;
function generateCars(){
    for(let i = 0; i < carsInRow; i++){
        cars.push(
            // first street
            vec2(0.9+i*0.8, -0.61),
            vec2(0.9+i*0.8, -0.69),
            vec2(0.7+i*0.8, -0.61),
            vec2(0.7+i*0.8, -0.61),
            vec2(0.7+i*0.8, -0.69),
            vec2(0.9+i*0.8, -0.69),
            // second street
            vec2(-(0.9+i*0.8), -0.41),
            vec2(-(0.9+i*0.8), -0.49),
            vec2(-(0.7+i*0.8), -0.49),
            vec2(-(0.7+i*0.8), -0.49),
            vec2(-(0.7+i*0.8), -0.41),
            vec2(-(0.9+i*0.8), -0.41),

            // third street
            vec2(0.9+i*0.8, -0.21),
            vec2(0.9+i*0.8, -0.29),
            vec2(0.7+i*0.8, -0.21),
            vec2(0.7+i*0.8, -0.21),
            vec2(0.7+i*0.8, -0.29),
            vec2(0.9+i*0.8, -0.29),

            // fourth street
            vec2(-(0.9+i*0.8), 0.21),
            vec2(-(0.9+i*0.8), 0.29),
            vec2(-(0.7+i*0.8), 0.21),
            vec2(-(0.7+i*0.8), 0.21),
            vec2(-(0.7+i*0.8), 0.29),
            vec2(-(0.9+i*0.8), 0.29),

            //fifth street
            vec2(0.9+i*0.8, 0.41),
            vec2(0.9+i*0.8, 0.49),
            vec2(0.7+i*0.8, 0.49),
            vec2(0.7+i*0.8, 0.49),
            vec2(0.7+i*0.8, 0.41),
            vec2(0.9+i*0.8, 0.41),

            // sixth street
            vec2(-(0.9+i*0.8), 0.61),
            vec2(-(0.9+i*0.8), 0.69),
            vec2(-(0.7+i*0.8), 0.61),
            vec2(-(0.7+i*0.8), 0.61),
            vec2(-(0.7+i*0.8), 0.69),
            vec2(-(0.9+i*0.8), 0.69),
        );
    }
    return cars;
}

function moveCars(offset){
    var carDir = 1;
    // var speed = [1, 1, 1, 1.2,1.2,1.2, 1.6,1.6,1.6, 2,2,2, 1.3,1.3,1.3, 1.9,1.9,1.9];
    // var counter = 0;
    for(let i = 0; i<cars.length; i++) {
        if(i % 6 == 0){
            carDir *= -1
            // counter++;
        }
        cars[i][0] = cars[i][0]+offset*carDir//*speed[counter]
    }
    for(let i = 0; i < cars.length; i+=6) {
        if(cars[i][0] + offset < -1.2 ) { 
            cars[i][0] = cars[i][0]+2.4
            cars[i+1][0] = cars[i+1][0]+2.4
            cars[i+2][0] = cars[i+2][0]+2.4
            cars[i+3][0] = cars[i+3][0]+2.4
            cars[i+4][0] = cars[i+4][0]+2.4
            cars[i+5][0] = cars[i+5][0]+2.4
        }
        if(cars[i][0] + offset > 1.2){ 
            cars[i][0] = cars[i][0]-2.4
            cars[i+1][0] = cars[i+1][0]-2.4
            cars[i+2][0] = cars[i+2][0]-2.4
            cars[i+3][0] = cars[i+3][0]-2.4
            cars[i+4][0] = cars[i+4][0]-2.4
            cars[i+5][0] = cars[i+5][0]-2.4
        } 
    }
    return cars;
}

function collisionDetection(){
    var carWidth = 0.2;
    var carHeight = 0.08;
    var frogWidth = 0.2;
    var frogHeight= 0.1;
    for(var i = 0; i < cars.length; i+=6){
        for(var j = 0; j < frogLoc.length; j++){
            for(var k = 0; k < 6; k++){
                if( cars[i][0] <= frogLoc[j][0] + frogWidth  && 
                    cars[i][0] + carWidth >= frogLoc[j][0]  && 
                    cars[i][1] <= frogLoc[j][1] + frogHeight && 
                    cars[i][1] + carHeight >= frogLoc[j][1]) {
                    console.log("dead");
                    collision =  true;
                }
            }
        }
    }
}

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    sideWalk = [
        vec2(-1, 1),
        vec2(-1, 0.8),
        vec2(1, 1),
        vec2(-1, 0.8),
        vec2(1, 0.8),
        vec2(1, 1),//topsidewalk ends here  
        vec2(-1, 0.1),  
        vec2(-1, -0.1),  
        vec2(1, 0.1),  
        vec2(1, 0.1),  
        vec2(1, -0.1),  
        vec2(-1, -0.1),//midsidewalk ends here  
        vec2(-1, -0.8),
        vec2(-1, -1),
        vec2(1, -0.8),
        vec2(1, -0.8),
        vec2(1, -1),
        vec2(-1, -1),//bottomsidewalk ends here
    ];
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    sideWalkBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, sideWalkBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(sideWalk), gl.STATIC_DRAW );
    
    carBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, carBuffer);
    generateCars();
    gl.bufferData( gl.ARRAY_BUFFER, flatten(cars), gl.STATIC_DRAW );

    frogBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, frogBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(frogLoc), gl.DYNAMIC_DRAW );

    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( vPosition );

    // uniform breytur
    color = gl.getUniformLocation(program, "color");

    const step = 0.1;
    var dir = 1;
    // Event listener for keyboard
    window.addEventListener("keydown", (e) => {
        if(e.code == "ArrowUp" && frogLoc[0][1]+step <= 1) {
            if(dir == 2){// var að benda niður
                frogLoc[0][1] += 0.1;
                frogLoc[1][1] -= 0.1;
                frogLoc[2][1] -= 0.1;
            }
            for(let i = 0; i<3; i++) {
                frogLoc[i][1] += step
            }
            dir = 1
        }
        else if(e.code == "ArrowRight" && frogLoc[0][0]+step <= 1) {
            for(let i = 0; i<3; i++) {
                frogLoc[i][0] += step 
            }
        }
        else if(e.code == "ArrowDown" && frogLoc[0][1]-step >= -1) {
            if(dir == 1){// var að benda upp
                frogLoc[0][1] -= 0.1;
                frogLoc[1][1] += 0.1;
                frogLoc[2][1] += 0.1;
            }
            for(let i = 0; i<3; i++) {
                frogLoc[i][1] -= step
            }
            dir = 2
        }
        else if(e.code == "ArrowLeft" && frogLoc[0][0]-step >= -1) {
            for(let i = 0; i<3; i++) {
                frogLoc[i][0] -= step;
            }
        }   
        gl.bindBuffer(gl.ARRAY_BUFFER, frogBuffer); 
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(frogLoc));
    });
    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    //sideWalkBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, sideWalkBuffer);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0,0);
    gl.uniform4fv(color, flatten(colorSidewalk));
    gl.drawArrays( gl.TRIANGLES, 0, sideWalk.length);

    //carBuffer
    gl.bindBuffer( gl.ARRAY_BUFFER, carBuffer );    
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(cars));
    moveCars(0.01);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0,0);
    gl.uniform4fv(color, flatten(colorCars));
    gl.drawArrays( gl.TRIANGLES, 0, cars.length );

    //frogBuffer
    gl.bindBuffer( gl.ARRAY_BUFFER, frogBuffer);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0,0);
    gl.uniform4fv(color, flatten(colorFrog));
    gl.drawArrays( gl.TRIANGLES, 0, 3 );

    collisionDetection()

    window.requestAnimationFrame(render);
}
