var VSHADER_SOURCE = `#version 300 es
in vec2 vertPosition;
uniform vec2 u_resolution;
uniform vec3 vertColor;
out vec3 fragColor;
void main() {
  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = vertPosition / u_resolution;
  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;
  // convert from 0->2 to -1->+1 (clipspace)
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace , 0, 1);
  gl_PointSize = 10.0;
  fragColor = vertColor;
`;
var FSHADER_SOURCE = [
    `#version 300 es
precision highp float;
in vec3 fragColor;
out vec4 outColor;
uniform vec3 vertColor;
void main() {
    outColor = vec4(0.7,fragColor.x,fragColor.y, 1.0);
}
`,
].join("\n");

var InitDemo  = function () {
    var canvas = document.getElementById("game-surface");
    var gl = canvas.getContext("webgl2")

    gl.clearColor(0.5, 0.3, 0.7, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER)
    var frangmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, VSHADER_SOURCE);
    gl.shaderSource(frangmentShader, FSHADER_SOURCE);
     gl.compileShader(vertexShader);
 if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
     console.error("ve", gl.getShaderInfoLog(vertexShader));
     return;
 }
    gl.compileShader(frangmentShader);
 if (!gl.getShaderParameter(frangmentShader, gl.COMPILE_STATUS)) {
     console.error("fe", gl.getShaderInfoLog(fragmentShader));
     return;
 }

    var program = gl.createProgram()
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, frangmentShader);

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
    gl.validateProgram(program);

    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    var positionAttribLocation = gl.getAttribLocation(program, "vertPosition")
    var colorAttribLocation = gl.getUniformLocation(program, "vertColor");

    var positionBuffer = gl.createBuffer()
    gl.clearColor(0.5, 0.3, 0.7, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(
        positionAttribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

   
/*     gl.drawArrays(gl.TRIANGLES, 0, 6);
 */

    for (var i = 0; i < 50; i++){
        setRectangle(gl, randomInt(300), randomInt(450), randomInt(300), randomInt(450));
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
        gl.uniform3f(colorAttribLocation, Math.random(), Math.random(), 0.3);
        console.log(colorAttribLocation, Math.random());
        gl.enableVertexAttribArray(colorAttribLocation);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        console.log(i);
    }
}
function randomInt(range) {
    return Math.floor(Math.random()*range)
}
function setRectangle(gl, x, y, width, heigth) {
/*       gl.clearColor(0.5, 0.3, 0.7, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
 */
    var x1 = x;
    var y1 = y;
    var x2 = x + width;
    var y2 = y + heigth;
    var trigleVertices = [
        x1, y1,
        x1, y2,
        x2, y2,
        x2, y2,
        x1, y1,
        x2, y1,
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trigleVertices), gl.STATIC_DRAW);
}