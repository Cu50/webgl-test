#version 300 es
precision highp float;
out vec4 outColor;
in vec3 fragColor;
uniform vec3 c_offset;
void main() {
    outColor = vec4(fragColor+c_offset, 1.0);  
}
