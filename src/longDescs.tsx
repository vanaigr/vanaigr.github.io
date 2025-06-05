import R from 'react'
import s from './longDescs.module.css'
import LinkList from './linkList'
import { faGithub, faApple } from '@fortawesome/free-brands-svg-icons'

export function Minceraft() {
    return <div className={s.desc}>
        <P>
            MinceraftClone is a Minecraft-inspired C++ & OpenGL game that uses ray tracing
            {' for'} rendering.
        </P>

        <P>
            Highlights:
            <Ul>
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
            </Ul>
        </P>

        <div className={s.links}>
            <LinkList
                links={[
                    {
                        to: 'https://www.github.com/vanaigr/MinceraftClone',
                        brand: faGithub,
                        text: 'github.com/vanaigr/MinceraftClone',
                    },
                ]}
            />
        </div>
    </div>
}

export function Timeline() {
    return <div className={s.desc}>
        <P>
            A job scheduling system with a React frontend and C# backend.
            Enables users to manage and optimize job assignments across multiple
            production devices. The system includes a custom high-performance
            probabilistic algorithm capable of optimizing hundreds of tasks across
            production lines in under a second.
        </P>

        <P>
            Key Contributions:
            <Ul>
                <Li>
                    Interactive timeline visualization and drag-and-drop job scheduling
                </Li>
                <Li>
                    Automatic scheduling algorithm
                </Li>
                <Li>
                    Non-working period and Daylight saving time handling
                </Li>
                <Li>
                    Backend server logic and support for optimistic updates
                </Li>
            </Ul>
        </P>
        <div className={s.links}>
            <LinkList
                links={[
                    {
                        to: 'https://www.oeeintellisuite.com',
                        icon: 'globe',
                        text: 'Company website',
                    },
                ]}
            />
        </div>
    </div>
}

export function DripApp() {
    return <div className={s.desc}>
        <P>
            A mobile app for tracking hydration levels and receiving personalized
            insights. Enables users to log drinks and view their forecasted hydration
            state. Food and activity logging are coming soon.
        </P>

        <P>
            Key Contributions:
            <Ul>
                <Li>
                    Designed and implemented a hydration simulation engine, tracking and predicting over 20 physiological parameters through in-depth research and development.
                </Li>

                <Li>
                    Developed core features including drink logging, log filtering, settings, and profile management on both frontend and backend.
                </Li>

                <Li>
                    Integrated Google Sign-In and implemented push notifications for reminders and updates.
                </Li>
            </Ul>
        </P>

        <P>
            The app is built with with Expo and React Native, and has a Node.js backend.
        </P>

        <div className={s.links}>
            <LinkList
                links={[
                    {
                        to: 'https://dripco.us',
                        icon: 'globe',
                        text: 'Our website',
                    },
                    {
                        to: 'https://apps.apple.com/us/app/drip-tech-hydration/id6742165567?ref=producthunt&at=1000l6eA',
                        brand: faApple,
                        text: 'See on App Store',
                    },
                ]}
            />
        </div>
    </div>
}

export function Minishoot() {
    return <div className={s.desc}>
        <P>
            The most comprehensive map of{' '}
            <a href='https://store.steampowered.com/app/1634860/Minishoot_Adventures/'>
                Minishoot' Adventures
            </a>.
            Features every in-game object, including their properties and relationships.
            Displays full collision data and includes background visuals for all locations.

            All data and backgrounds were extracted from the game using a custom C# script.
        </P>

        <P>
            Highlights:
            <Ul>
                <Li>
                    Used Web Worker API to decode and filter large datasets without blocking user interactions.
                </Li>
                <Li>
                    Used WebGL2 to optimize rendering performance and allowing over 300,000 markers to be displayed with minimal stutter.
                </Li>
                <Li>
                    Designed a custom sub-pixel texture rendering algorithm to prevent aliasing when zooming in.
                </Li>
            </Ul>
        </P>
        <div className={s.links}>
            <LinkList
                links={[
                    {
                        to: 'https://minishoot-map.github.io',
                        icon: 'globe',
                        text: 'minishoot-map.github.io',
                    },
                    {
                        to: 'https://github.com/minishoot-map/minishoot-map.github.io',
                        brand: faGithub,
                        text: 'github.com/minishoot-map/minishoot-map.github.io',
                    },
                ]}
            />
        </div>
    </div>
}

export function Rainwatcher() {
    return <div className={s.desc}>
        <P>
            First interactive map of{' '}
            <a href='https://store.steampowered.com/app/2857120/Rain_World_The_Watcher/'>
                Rain World: the Watcher DLC
            </a>.
            Includes all accessible regions, echo locations, warp points,
            and karma flowers.

            All data and backgrounds were extracted from the game using a custom C# script.
        </P>
        <P>
            Highlights:
            <Ul>
                <Li>
                    Applied knowledge from the Minishoot' Adventures map to build and release the first public version within one week of the DLC's launch.
                </Li>
            </Ul>
        </P>
        <div className={s.links}>
            <LinkList
                links={[
                    {
                        to: 'https://rainwatchermap.github.io',
                        icon: 'globe',
                        text: 'rainwatchermap.github.io',
                    },
                    {
                        to: 'https://github.com/RainWatcherMap/rainwatchermap.github.io',
                        brand: faGithub,
                        text: 'github.com/RainWatcherMap/rainwatchermap.github.io',
                    },
                ]}
            />
        </div>
    </div>
}

export function GroupTimetable() {
    return <div className={s.desc}>
        <P>
            A scheduling website for students at my former university.
            Allows users to upload the university’s shared schedule PDF,
            extract their cohort’s timetable, and view it in a clean format.
            Also supports exporting schedules to calendar apps.
        </P>
        <P>
            Highlights:
            <Ul>
                <Li>
                    Developed a heuristic algorithm to accurately extract structured table data from complex PDF files.
                </Li>

                <Li>
                    Optimized PDF decoding and rendering pipeline to achieve sub-millisecond processing time.
                </Li>
            </Ul>
        </P>
        <div className={s.links}>
            <LinkList
                links={[
                    {
                        to: 'https://grouptimetable.github.io',
                        icon: 'globe',
                        text: 'grouptimetable.github.io',
                    },
                    {
                        to: 'https://github.com/GroupTimetable/GroupTimetable.github.io',
                        brand: faGithub,
                        text: 'github.com/GroupTimetable/GroupTimetable.github.io',
                    },
                ]}
            />
        </div>
    </div>
}

type A = { children: R.ReactNode }

function P({ children }: A) {
    return <div className={s.p}>{children}</div>
}

function Li({ children }: A) {
    return <li className={s.li}>{children}</li>
}

function Ul({ children }: A) {
    return <ul className={s.ul}>{children}</ul>
}
