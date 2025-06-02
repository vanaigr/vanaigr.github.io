import R from 'react'
import s from './longDescs.module.css'

export function Minceraft() {
    return <div>
        <P>
            MinceraftClone is a Minecraft-inspired C++ & OpenGL game that uses ray tracing
            {' for'} rendering.
        </P>

        <P>
            What I worked on:
            <ul className={s.ul}>
                <Li>
                    GPU-accelerated ray-tracing that uses software recursion
                    (hardware doesn't support recursion) for rendering complex meterials.
                </Li>
                <Li>
                    Physics, fluid simulation and lighting.
                </Li>
                <Li>
                    Custom fluid simulation integrated with cube-based physics.
                </Li>
                <Li>
                    Signed Distance Field text rendering with automated font bitmap generation.
                </Li>
                <Li>
                    Hot-reloading for shaders, textures, and configurations during runtime.
                </Li>
            </ul>
        </P>
    </div>
}

type A = { children: R.ReactNode }

function P({ children }: A) {
    return <div className={s.p}>{children}</div>
}

function Li({ children }: A) {
    return <li className={s.li}>{children}</li>
}
