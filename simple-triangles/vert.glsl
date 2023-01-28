#version 300 es

in vec2 vertPosition;
in vec3 vertColor;
out vec3 fragColor;
uniform float gTime;

void main() {
    fragColor = vertColor;
    gl_Position = vec4(vertPosition + 0.5 * sin(gTime * 0.001) + 0.5, 0.0, 1.0);
    gl_PointSize = 10.0;
}
