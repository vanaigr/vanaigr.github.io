import R from 'react'
import s from './longDescs.module.css'
import LinkList from './linkList'
import { faGithub, faApple } from '@fortawesome/free-brands-svg-icons'

export function Minceraft() {
    return <div className={s.desc}>
        <P>
            MinceraftClone is a Minecraft-inspired C++, OpenGL & CMake game that uses ray tracing
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
            A job scheduling system that enables users to manage and optimize
            job assignments across multiple production devices.
            The system includes a custom high-performance
            probabilistic algorithm capable of optimizing hundreds of tasks across
            production lines in under a second.
        </P>

        <P>
            Highlights:
            <Ul>
                <Li>
                    Implemented interactive timeline visualization and drag-and-drop
                    job scheduling using React.js, TypeScript, Zustand and Vite.
                </Li>
                <Li>
                    Designed automatic scheduling algorithm using a combination of
                    brute-force, simulated-anneal and gradient descent techniques.
                </Li>
                <Li>
                    Implemented logic to handle non-working periods and
                    Daylight saving time.
                </Li>
                <Li>
                    Wrote unit tests using Vitest, component tests using React Testing
                    Library, and integration tests using Playwright.
                </Li>
                <Li>
                    Implemented backend in C# that supports concurrent optimistic updates.
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
                    Designed and implemented a hydration simulation engine
                    that tracks and predicts over 20 physiological parameters through
                    in-depth research and development.
                </Li>

                <Li>
                    Developed core features including drink logging, log filtering,
                    settings, and profile management on both frontend and backend
                    using TypeScript, React.js, React Native, Zustand and Node.js.
                </Li>

                <Li>
                    Integrated Google Sign-In and implemented push notifications for reminders and updates in Java and Kotlin.
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

export function Lumafly() {
    return <div className={s.desc}>
        <P>
            <a href='https://store.steampowered.com/app/367520/Hollow_Knight/'>
                Hollow Knight
            </a> mod for tracking freed Lumaflies, written in C#.
            Originally developed for <a href='https://www.youtube.com/@Surry'>Skurry</a>.
            The mod comes with a simple map website that helps players locate
            remaining Lumaflies.
        </P>
        <div className={s.links}>
            <LinkList
                links={[
                    {
                        to: 'https://github.com/vanaigr/LumaflyKnight',
                        brand: faGithub,
                        text: 'Mod GitHub',
                    },
                    {
                        to: 'https://github.com/vanaigr/LumaflyMap',
                        brand: faGithub,
                        text: 'Map GitHub',
                    },
                ]}
            />
        </div>
    </div>
}

export function Life() {
    return <div className={s.desc}>
        <P>
            High-performance implementation of Conway's Game of Life, built with C++, OpenGL, and CMake. Can simulate ~2.5 billion cells per second on a single core.
        </P>

        <P>
            Highlights:
            <Ul>
                <Li>
                    Designed and implemented a custom SIMD-optimized algorithm to process 32 cells at once using 16-byte wide registers, significantly accelerating computation.
                </Li>
                <Li>
                    Introduced multithreading to compute different regions of the field in parallel, improving performance and maintaining responsive user interaction.
                </Li>
            </Ul>
        </P>
        <div className={s.links}>
            <LinkList
                links={[
                    {
                        to: 'https://github.com/vanaigr/gameOfLife',
                        brand: faGithub,
                        text: 'github.com/vanaigr/gameOfLife',
                    },
                ]}
            />
        </div>
    </div>
}

export function Airline() {
    return <div className={s.desc}>
        <P>
            Client-server flight reservation application.
            Users can search flights, pick seats, choose extras, book tickets, view
            booked tickets and cancel bookings.
            Operators can view flights, search passangers and track attendance.
            The app is built with C# and Windows Forms, uses Windows Communication Foundation (WCF) for communication and SQL Server.
        </P>
        <div className={s.links}>
            <LinkList
                links={[
                    {
                        to: 'https://github.com/vanaigr/FlightReservation',
                        brand: faGithub,
                        text: 'github.com/vanaigr/FlightReservation',
                    },
                ]}
            />
        </div>
    </div>
}

export function Easyword() {
    return <div className={s.desc}>
        <P>
            Neovim plugin that lets you jump to any word on the screen in just a few keystrokes.
            Unlike similar plugins such as <a href='https://github.com/justinmk/vim-sneak'>vim-sneak</a>
            and <a href='https://github.com/ggandor/leap.nvim'>leap.nvim</a>, it preserves last label positions,
            allowing to recover quickly from mistyped keys. It also supports customizable key-to-character mappings,
            useful for jumping in files in different languages or alphabets.
        </P>
        <div className={s.links}>
            <LinkList
                links={[
                    {
                        to: 'https://github.com/vanaigr/easyword.nvim',
                        brand: faGithub,
                        text: 'github.com/vanaigr/easyword.nvim',
                    },
                ]}
            />
        </div>
    </div>
}

export function Uniboard() {
    return <div className={s.desc}>
        <P>
            Android app (Java & Kotlin) for building fully customizable keyboards.
        </P>
        <P>
            Highlights:
            <Ul>
                <Li>
                    Includes a Unicode character menu for viewing and typing any unicode character.
                </Li>
                <Li>
                    Supports custom layouts with user-defined keys, appearance settings, and nested key popups.
                </Li>
                <Li>
                    Optimized to switch between keyboard layouts in a single frame, outperforming popular keyboards which (still! 2020 project and more powerful phones) take multiple frames.
                </Li>
            </Ul>
        </P>
    </div>
}

export function ReactChallenge() {
    return <div className={s.desc}>
        <P>
            Web app for managing production orders.
            Allows users to manage equipment and maintenance records.
        </P>
        <P>
            Highlights:
            <Ul>
                <Li>
                    Implemented frontend and backend of the application using
                    Next.js, Tailwind CSS, React.js, TypeScript, TanStack table, Zod and Zustand.
                </Li>
                <Li>
                    Designed database schema using Prisma.
                </Li>
                <Li>
                    Implemented unit, integration and API endpoints tests using
                    Jasmine and Playwright, as well as linting using Biome.
                </Li>
                <Li>
                    Wrote Dockerfile to run the application in the container.
                </Li>
            </Ul>
            <div className={s.links}>
                <LinkList
                    links={[
                        {
                            to: 'https://github.com/vanaigr/production-order-scheduler',
                            brand: faGithub,
                            text: 'github.com/vanaigr/production-order-scheduler',
                        },
                    ]}
                />
            </div>
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

function Ul({ children }: A) {
    return <ul className={s.ul}>{children}</ul>
}
