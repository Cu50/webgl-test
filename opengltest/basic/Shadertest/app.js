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

    var program = webglUtils.createProgramFromSources(gl, [vertexShaderSource, fragmentShaderSource]);

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Link the two shaders into a program
    var program = createProgram(gl, vertexShader, fragmentShader);
    var positionAttribLocation = gl.getAttribLocation(program, "a_position");
    var resolutionUniformLocation = gl.getUniformLocation(program, "a_resolution");
    var colorAttribLocation = gl.getAttribLocation(program, "a_color");

    var offsetUniformLocation = gl.getUniformLocation(program, "a_offset");
    var colorOffsetUniformLocation = gl.getUniformLocation(program, "c_offset");

    var positionBuffer = gl.createBuffer();
    var colorBuffer = gl.createBuffer();

    /* var vao = gl.createVertexArray(); */
    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
    var triangleArray1 = new Float32Array([200, 100, 500, 100, 200, 300]);

    var colorArray = new Float32Array([1.0, 0.5, 0.3, 0, 1, 0.5, 1.5, 0.4, 1]);

    var triangleArray = new Float32Array([0.2, 0.1, 0.5, 0.1, 0.2, 0.3, 0.5, 0.1, 0.2, 0.3, 0.5, 0.3]);
    gl.bufferData(gl.ARRAY_BUFFER, triangleArray1, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colorArray, gl.STATIC_DRAW);
    gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    requestAnimationFrame(drawScene);
    function drawScene(now) {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0.0, 0.2, 0.3, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(program);
        var timeValue = Math.sin(now) / 2.0 + 0.5;
        gl.bindVertexArray(vao);
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
        gl.uniform2f(offsetUniformLocation, 50.0, 200.0);
        gl.uniform3f(colorOffsetUniformLocation, timeValue, timeValue, timeValue);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(drawScene);
    }
    // Tell WebGL how to convert from clip space to pixels
}

main();
