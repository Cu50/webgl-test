#version 300 es
in vec2 a_position;
in vec3 a_color;
in vec2 a_texcoord;

uniform vec2 a_resolution;

out vec3 fragColor;
out vec2 v_texcoord;

void main() {
    vec2 position = a_position/a_resolution;
    position = position*2.0;
   position = position-1.0;
   position = position * vec2(1, -1);
    gl_Position = vec4(position , 1.0, 1.0); 
    gl_PointSize = 50.0;      
    fragColor = a_color;      
    v_texcoord = a_texcoord;
}
