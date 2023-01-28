#version 300 es
in vec2 a_position;
in vec3 a_color;
uniform vec2 a_resolution;
out vec3 fragColor;
uniform vec2 a_offset; 
void main() {
    vec2 position = a_position/a_resolution;
    vec2 offset = a_offset/a_resolution;
    position = position*2.0;
   position = position-1.0;
   position = position * vec2(1, -1);
    gl_Position = vec4(position.x+offset.x,-position.y+offset.y , 1.0, 1.0); 
    gl_PointSize = 50.0;      
    fragColor = a_color;      
}
