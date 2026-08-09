const brainFragment = /* glsl */ `

uniform sampler2D uTexture;
uniform float uTime;
uniform float uProgress;

varying vec2 vUv;

void main() {

    vec2 uv = vUv;

    vec4 tex = texture2D(uTexture, uv);

    // Preserve original alpha
    if (tex.a < 0.02) discard;

    // ---------------------------------
    // Cyan → Purple holographic tint
    // ---------------------------------

    vec3 cyan = vec3(
        0.0,
        0.92,
        1.0
    );

    vec3 purple = vec3(
        0.58,
        0.25,
        1.0
    );

    float colorShift =
        sin(
            uTime * 0.8
        ) * 0.5 + 0.5;

    vec3 holoColor =
        mix(
            cyan,
            purple,
            colorShift
        );

    tex.rgb *= holoColor;

    // ---------------------------------
    // Horizontal Scan Line
    // ---------------------------------

    float scan =
        smoothstep(
            0.0,
            1.0,
            sin(
                uv.y * 180.0 -
                uTime * 8.0
            ) * 0.5 + 0.5
        );

    tex.rgb += scan * 0.05;

    // ---------------------------------
    // Soft shimmer
    // ---------------------------------

    float shimmer =
        sin(
            (uv.x + uv.y) * 20.0 +
            uTime * 2.0
        ) * 0.02;

    tex.rgb += shimmer;

    // ---------------------------------
    // Edge Glow (Alpha Based)
    // ---------------------------------

    float edge =
        1.0 -
        smoothstep(
            0.0,
            0.35,
            tex.a
        );

    float pulse =
        0.6 +
        0.4 *
        sin(
            uTime * 2.5
        );

    tex.rgb +=
        holoColor *
        edge *
        pulse *
        (
            0.35 +
            uProgress * 0.35
        );

    // ---------------------------------
    // Progress Brightness
    // ---------------------------------

    tex.rgb *=
        1.0 +
        uProgress * 0.18;

    gl_FragColor =
        vec4(
            tex.rgb,
            tex.a
        );

}
`;

export default brainFragment;