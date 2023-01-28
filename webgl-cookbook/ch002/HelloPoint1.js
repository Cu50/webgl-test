var VSHADER_SOURCE = [
    "precision mediump float;",
    "",
    "attribute vec3 vertPosition;",
    "",
    "void main() ",
    "{",
    "gl_Position =  vec4(vertPosition,1.0);", // point 1.0 vector 0
    "gl_PointSize = 10.0;",
    "}",
].join("\n");

var FSHADER_SOURCE = [
        "void main() ",
        "{",
        " gl_FragColor =  vec4(0.0,1.0,1.0,1.0);",
        "}",
].join("\n");

    function main() {
        
        var canvas = document.getElementById("example");
        var gl = canvas.getContext("webgl");
        if (!gl) {
            console.log("your browser not support Webgl");
            return;
        }
        gl.clearColor(0, 0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, VSHADER_SOURCE);
        gl.compileShader(vertexShader);
        
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, FSHADER_SOURCE);
        gl.compileShader(fragmentShader);


        var program = gl.createProgram();
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.validateProgram(program);
          if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
              console.error("error validateProgram", gl.getShaderInfoLog(program));
              return;
        }
        var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
        gl.vertexAttrib3f(positionAttribLocation, 0.0, -0.8,0.0);

        gl.useProgram(program);
        gl.drawArrays(gl.POINTS,0,10);
};
    
