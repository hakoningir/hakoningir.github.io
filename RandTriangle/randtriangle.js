var gl;
let vertices = [];
var colorLoc;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    for(let i = 0; i < 100; i++){
        vertices.push(vec2(-0.1, 0),
                      vec2(0.1, 0),
                      vec2(0, 0.1));
    }
    for (let i = 0; i < vertices.length; i += 3){
        var x = -1+Math.random()*2;
        var y = -1+Math.random()*2;
        vertices[i][0]+=x; 
        vertices[i][1]+=y; 
        vertices[i+1][0]+=x; 
        vertices[i+1][1]+=y; 
        vertices[i+2][0]+=x; 
        vertices[i+2][1]+=y; 
        //færa alla punkta um randomtölu á bilinu 0 og 1
    }
    // var u = add( vertices[0], vertices[1]);
    // var v = add( vertices[0], vertices[2]);
    // var t = scale(Math.random(), add(u,v));

    // triangle = [t]

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Find the location of the variables colors and offset in the shader program
    colorLoc = gl.getUniformLocation( program, "colors" );
    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    for(let i = 0; i < 300; i+=3){
        gl.uniform4fv( colorLoc, vec4(Math.random(), Math.random(), Math.random(), 1) );
        
        gl.drawArrays( gl.TRIANGLES, i, 3 );   
    }
}
