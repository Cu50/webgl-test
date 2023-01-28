#version 300 es
precision highp float;
out vec4 outColor;
in vec3 fragColor;
in vec2 v_texcoord;

uniform sampler2D u_texture;
void main() {
  outColor = vec4(1.0,0.2,0.3,1.0);
   outColor = texture(u_texture,v_texcoord);
}
