#version 300 es
in vec2 a_position;
uniform vec2 a_resolution;
void main() {
    vec2 position = a_position/a_resolution;
    position = position*2.0;
   position = position-1.0;
    gl_Position = vec4(position * vec2(1, -1), 1.0, 1.0); 
    gl_PointSize = 50.0;                
}
