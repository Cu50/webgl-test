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
}
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

var InitDemo = function () {
    var canvas = document.getElementById("game-surface");
    var gl = canvas.getContext("webgl2");

    gl.clearColor(0.5, 0.3, 0.7, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
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

    var program = gl.createProgram();
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
    var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
    var colorAttribLocation = gl.getUniformLocation(program, "vertColor");

    var positionBuffer = gl.createBuffer();
    gl.clearColor(0.5, 0.3, 0.7, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);

    /*     gl.drawArrays(gl.TRIANGLES, 0, 6);
     */

    for (var i = 0; i < 50; i++) {
        setRectangle(gl, randomInt(300), randomInt(450), randomInt(300), randomInt(450));
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
        gl.uniform3f(colorAttribLocation, Math.random(), Math.random(), 0.3);
        console.log(colorAttribLocation, Math.random());
        gl.enableVertexAttribArray(colorAttribLocation);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        console.log(i);
    }
};
function randomInt(range) {
    return Math.floor(Math.random() * range);
}
function setGeometry(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            // left column
            0, 0, 30, 0, 0, 150, 0, 150, 30, 0, 30, 150,

            // top rung
            30, 0, 100, 0, 30, 30, 30, 30, 100, 0, 100, 30,

            // middle rung
            30, 60, 67, 60, 30, 90, 30, 90, 67, 60, 67, 90,
        ]),
        gl.STATIC_DRAW
    );
}

var m3 = {
    translation: function translation(tx, ty) {
        return [1, 0, 0, 0, 1, 0, tx, ty, 1];
    },
    scaling: function scaling(sx, sy) {
        return [sx, 0, 0, 0, sy, 0, 1, 1, 1];
    },
    rotation: function rotation(angleInradians) {
        var c = Math.cos(angleInradians);
        var s = Math.sin(angleInradians);
        return [c, -s, 0, s, c, 0, 0, 0, 1];
    },
    multiply: function multiply(a, b) {
        var a00 = a[0 * 3 + 0];
        var a01 = a[0 * 3 + 1];
        var a02 = a[0 * 3 + 2];
        var a10 = a[1 * 3 + 0];
        var a11 = a[1 * 3 + 1];
        var a12 = a[1 * 3 + 2];
        var a20 = a[2 * 3 + 0];
        var a21 = a[2 * 3 + 1];
        var a22 = a[2 * 3 + 2];
        var b00 = b[0 * 3 + 0];
        var b01 = b[0 * 3 + 1];
        var b02 = b[0 * 3 + 2];
        var b10 = b[1 * 3 + 0];
        var b11 = b[1 * 3 + 1];
        var b12 = b[1 * 3 + 2];
        var b20 = b[2 * 3 + 0];
        var b21 = b[2 * 3 + 1];
        var b22 = b[2 * 3 + 2];
        return [
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ];
    },
};
