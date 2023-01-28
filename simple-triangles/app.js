var VSHADER_SOURCE = [
    "#version 300 es",
    "",
    "in vec3 vertPosition;",
    "",
    "in vec3 vertColor;",
    "",
    "out vec3 fragColor;",
    "",
    "uniform float gTime;",
    "",
    "void main() ",
    "{",
    " fragColor = vertColor;",
    /*     " gl_Position = vec4(vertPosition + 0.5 * sin(gTime * 0.001)  + 0.5, 0.0, 1.0);", */
    // " gl_Position = vec4(vertPosition[0]*sin(gTime * 0.001)-vertPosition[0]*cos(gTime * 0.001),vertPosition[1]*cos(gTime * 0.001)-vertPosition[1]*sin(gTime * 0.001),0.0, 1.0);", //??
    " gl_Position = vec4(vertPosition[0]*sin(gTime * 0.001)-vertPosition[1]*cos(gTime * 0.001)+ 0.5 * sin(gTime * 0.001)  ,vertPosition[1]*cos(gTime * 0.001)-vertPosition[1]*sin(gTime * 0.001),vertPosition[2]*cos(gTime * 0.001), 1.0);", //??

    " gl_PointSize = 10.0;",
    "}",
].join("\n");
/* 'precision mediump float;\n'+
'attribute vec2 vertPosition;'+
' gl_Position = vec4(vertPosition,0.0,1.0);\n'+
' gl_PointSize = 10.0;\n'+
'}\n';
 */
var FSHADER_SOURCE = [
    // "#version 300 es",
    // "precision highp float;",
    // "",
    // "in vec3 fragColor;",
    // "out vec4 outColor;",
    // "",
    // "void main() ",
    // "{",
    // " outColor = vec4(fragColor, 1.0);",
    // "}",
    `#version 300 es

precision highp float;

in vec3 fragColor;
out vec4 outColor;
uniform float gTime;

void main() {
    outColor = vec4(fragColor * 0.5*sin(gTime*0.01)+0.5, 1.0);
}
`,
].join("\n");
/* 'precision mediump float;\n'+
'void main() {\n'+
' gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n'+
'}\n'; */

var InitDemo = function () {
    console.log("work!");
    var canvas = document.getElementById("game-surface");
    var gl = canvas.getContext("webgl2");
    console.log(document.getElementById("vertex_shader").src);

    if (!gl) {
        console.log("not support");
        gl = canvas.getContext("experimental-webgl");
    }
    if (!gl) {
        alert("not !!!!!!");
    }

    /*     if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log('byeeeeeeee');
        return 
    } */
    console.log();

    gl.clearColor(0.55, 0.1, 0.3, 0.5);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, VSHADER_SOURCE);
    gl.shaderSource(fragmentShader, FSHADER_SOURCE);

    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error("ve", gl.getShaderInfoLog(vertexShader));
        return;
    }
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error("fe", gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("error link", gl.getShaderInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error("error validateProgram", gl.getShaderInfoLog(program));
        return;
    }
    /*  var trigleVertices = [
        0.0,0.5,
        -0.5,-0.5,
        0.5,-0.5,
        0.8,0.8,
        0.9,0.9,
        0.4,0.4,
    ];
     */
    /* var trigleVertices = [
        0.0, 0.5, 1.0, 1.0, 1.0, -0.5, -0.5, 1.0, 1.0, 1.0, 0.5, -0.5, 1.0, 0.3, 0.7, 0.0, 0.5, 1.0, 1.0, 1.0, -0.5,
        -0.5, 1.0, 1.0, 1.0, -0.9, 0.5, 0.2, 0.3, 1.0, 0.0, 0.5, 1.0, 1.0, 1.0, 0.5, -0.5, 1.0, 1.0, 1.0, 0.9, 0.5, 0.2,
        1.0, 0.1,
    ];
 */
    var trigleVertices = [
        -0.5, 0.5, -1.0, 0.0, 1.0,
        -0.5, -0.5, 0.5, 1.0, 1.0,
        0.5, 0.5, -1.0, 0.3, 0.7,
        0.5, -0.5, 0.3, 1.0, 1.0,
        -0.5, -0.5, 1.0, 1.0, 1.0,
        -0.9, 0.5, -0.2, 0.3, 1.0,
        0.0, 0.5, 1.0, 1.0, 1.0,
        0.5, -0.5,-0.8, 1.0, 1.0,
        0.9, 0.5, 0.2,1.0, 0.1,
    ];

    var retangleVertices = [
        1.0, 0.5, 0.0, 1.0, 1.0, -3.5, -0.5, 1.0, 1.0, 1.0, 0.5, -0.5, 1.0, 0.3, 0.7, 0.0, 0.5, 1.0, 1.0, 1.0, -0.5,
        -0.5, 1.0, 1.0, 0.0, -0.9, 0.5, 0.2, 0.3, 1.0, 0.0, 0.5, 1.0, 0.0, 1.0, 0.5, -0.5, 1.0, 1.0, 1.0, 0.9, 0.5, 0.2,
        1.0, 0.1,
    ];

    var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
    var colorAttribLocation = gl.getAttribLocation(program, "vertColor");

    var timeLocation = gl.getUniformLocation(program, "gTime");

    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trigleVertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(
        colorAttribLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT//偏移量
    );

    var vao2 = gl.createVertexArray();
    gl.bindVertexArray(vao2);

    var retangleVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, retangleVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(retangleVertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(
        colorAttribLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    
    gl.useProgram(program);

    function draw(timestamp) {
        gl.clearColor(0.55, 0.1, 0.3, 0.5);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniform1f(timeLocation, timestamp);

       // if (Math.sin(timestamp * 0.01) > 0) {
            gl.bindVertexArray(vao);
            gl.enableVertexAttribArray(positionAttribLocation);
            gl.enableVertexAttribArray(colorAttribLocation);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        //} 
        /* else {
            gl.bindVertexArray(vao2);
            gl.enableVertexAttribArray(positionAttribLocation);
            gl.enableVertexAttribArray(colorAttribLocation);
            gl.drawArrays(gl.TRIANGLES, 0, 9);
        } */

        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
};
