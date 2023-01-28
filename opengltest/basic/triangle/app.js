var getSourceSynch = function (url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    return req.status == 200 ? req.responseText : null;
};

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader)); // eslint-disable-line
    gl.deleteShader(shader);
    return undefined;
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program)); // eslint-disable-line
    gl.deleteProgram(program);
    return undefined;
}

 function main() {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl2");
    if (!gl) {
        return;
    }
     var vertexShaderSource = getSourceSynch("vertexShader.vs");
    var fragmentShaderSource = getSourceSynch("fragmentShader.fs");

    var program = webglUtils.createProgramFromSources(gl, [vertexShaderSource,fragmentShaderSource]);
     
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Link the two shaders into a program
    var program = createProgram(gl, vertexShader, fragmentShader);
    var positionAttribLocation = gl.getAttribLocation(program, "a_position")
    var resolutionUniformLocation = gl.getUniformLocation(program, "a_resolution");

    var positionBuffer = gl.createBuffer();
      
    /* var vao = gl.createVertexArray(); */
        var vao = gl.createVertexArray();
     gl.bindVertexArray(vao);
     var vao2 = gl.createVertexArray();
     gl.bindVertexArray(vao);

     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
     gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
    var triangleArray1 = new Float32Array([
        200, 100,
        500, 100,
        200, 300,
        500, 100,
        200, 300,
        500, 300,
    ])
     var triangleArray = new Float32Array([0.2, 0.1, 0.5, 0.1, 0.2, 0.3, 0.5, 0.1, 0.2, 0.3, 0.5, 0.3]);
     gl.bufferData(gl.ARRAY_BUFFER, triangleArray1, gl.STATIC_DRAW);


    gl.enableVertexAttribArray(positionAttribLocation);
  
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0.0, 0.2, 0.3, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
     gl.useProgram(program);
    
     gl.bindVertexArray(vao);
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
     gl.drawArrays(gl.TRIANGLES, 0, 6);
     


}
main(); 
