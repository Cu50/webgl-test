function main() {
    var canvas = document.getElementById('example');
    var gl = canvas.getContext("webgl");
    if (!gl) {
        console.log('your browser not support Webgl');
        return 
    }
    gl.clearColor(0, 0, 1, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    
}