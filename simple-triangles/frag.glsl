#version 300 es

precision highp float;

in vec3 fragColor;
out vec4 outColor;
uniform float gTime;

void main() {
    outColor = vec4(fragColor * 0.5*sin(gTime)+0.5, 1.0);
}
