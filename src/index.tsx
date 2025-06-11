import R from 'react'
import RDD from 'react-dom'
import RD from 'react-dom/client'
import * as Z from 'zustand'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import '@/index.css'
import s from './index.module.css'
import * as D from './data'
import LinkList from './linkList'

function animStyle(name: string): ({}) {
    return { '--viewTransitionName': name }
}

// NOTE: other files also use these but all adds are here
library.add({ faGithub })
library.add({ faLinkedinIn })

const root = RD.createRoot(document.getElementById('root')!)
root.render(<Router/>)

const order = ['index', 'contact'] as const
type Page = { type: 'contact' } | { type: 'index', project: D.ProjectId | undefined }

type Location = {
    prev: Page
    cur: Page
}

function getPage(url: URL): Page {
    const p = url.pathname
    if(p === '/contact') {
        return { type: 'contact' }
    }

    const pb = '/projects/'
    if(p.startsWith(pb)) {
        const project = p.substring(pb.length)
        if(project in D.projects) {
            return { type: 'index', project: project as keyof typeof D.projects }
        }
    }

    return { type: 'index', project: undefined }
}
function getPathname(page: Page): string {
    if(page.type === 'index') {
        if(page.project == null) return '/'
        return '/projects/' + encodeURIComponent(page.project)
    }
    else if(page.type === 'contact') {
        return '/contact'
    }

    return page satisfies never
}

type LocationStore = Z.UseBoundStore<Z.StoreApi<Location>>
const locationContext = R.createContext<LocationStore>(undefined as never)
function useLocation() {
    return R.useContext(locationContext)
}

function Router() {
    const store = R.useState(() => {
        const loc = getPage(new URL(window.location.href))
        return Z.create<Location>(() => {
            return { prev: loc, cur: loc, transition: undefined }
        })
    })[0]
    R.useEffect(() => {
        const listener = () => {
            const loc = getPage(new URL(window.location.href))
            updDirection(loc, store)
        }
        window.addEventListener('popstate', listener)
        return () => window.removeEventListener('popstate', listener)
    }, [])

    return <locationContext.Provider value={store}>
        <RouterInner/>
    </locationContext.Provider>
}

function RouterInner() {
    const location = useLocation()
    const loc = location(it => it.cur)
    if(loc.type === 'index') {
        return <Wrapper><App/></Wrapper>
    }
    else {
        return <Wrapper><Contact/></Wrapper>
    }
}

function updDirection(newP: Page, location: LocationStore) {
    const p = location.getState().cur

    const newI = order.indexOf(newP.type)
    const curI = order.indexOf(p.type)
    if(curI !== newI) {
        const transition = newI < curI ? 'left' : 'right'

        animate({
            update: () => {
                RDD.flushSync(() => {
                    location.setState({ prev: p, cur: newP }, true)
                })
            },
            types: ['screen', transition],
        })
        return
    }

    location.setState({
        prev: p,
        cur: newP,
    }, true)
}

function Wrapper({ children }: { children: R.ReactNode }) {
    const location = useLocation()
    const loc = location(it => it.cur)
    // @ts-ignore
    const generatedAt = GENERATED_AT
    const gen = new Date(generatedAt).toLocaleString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
    }) + ' UTC'

    return <div className={s.app}>
        <div className={s.header}>
            <div className={s.headerBord}>
                <span>Artem Andrievskii</span>
            </div>
            <div className={s.headerCent}>
                <a
                    className={s.headerLink}
                    href='/'
                    style={loc.type === 'index' ? { textDecoration: 'underline' } : {}}
                    onClick={it => {
                        it.preventDefault()
                        const np: Page = { type: 'index', project: undefined }
                        updDirection(np, location)
                        history.pushState({}, '', getPathname(np))
                    }}
                >
                    <div>Programming</div>
                </a>
                <a
                    className={s.headerLink}
                    style={loc.type === 'contact' ? { textDecoration: 'underline' } : {}}
                    onClick={it => {
                        it.preventDefault()
                        const np: Page = { type: 'contact' }
                        updDirection(np, location)
                        history.pushState({}, '', getPathname(np))
                    }}
                    href='/contact'
                >
                    <div>Contact</div>
                </a>
            </div>
            <div className={s.headerBord + ' ' + s.headerSpacer}/>
        </div>
        {children}
        <div className={s.footer}>
            <div>Generated {gen}</div>
            <div>
                Source: <a href='https://github.com/vanaigr/vanaigr.github.io'>
                    github.com/vanaigr/vanaigr.github.io
                </a>
            </div>
        </div>
    </div>
}

function App() {
    return <div
        className={s.body + ' ' + s.screenAnimation}
        style={animStyle('screen-index')}
    >
        <div className={s.appSpacer}/>
        <div className={s.categories}>
            {D.categories.map((it, i) => {
                return <Category key={i} category={it}/>
            })}
        </div>
        <div className={s.order}>
            <OrderMenu/>
        </div>
    </div>
}

function OrderMenu() {
    return <div>
        <div className={s.title}>In chronological order</div>
        {D.projectsByYear.map((it, i) => {
            return <div key={i} className={s.orderList}>
                {/*<div className={s.title}>
                    {it.year}
                </div>*/}
                <div className={s.list}>
                    {it.projects.map((it, i) => {
                        return <OrderItem key={i} projectId={it}/>
                    })}
                </div>
            </div>
        })}
    </div>
}

function OrderItem({ projectId }: { projectId: D.ProjectId }) {
    const dialogRef = R.useRef<HTMLDialogElement>(null)
    const it = D.projects[projectId]

    const backgroundId = btoa2(R.useId())
    const fullBackgroundId = 'item-' + backgroundId

    const [isOpen, setIsOpen] = R.useState(false)
    const open = () => {
        const d = dialogRef.current
        if(!d) return
        animate({
            update: () => {
                d.showModal()
                RDD.flushSync(() => setIsOpen(true))
            },
            types: ['item'],
        })
    }
    const close = () => {
        const d = dialogRef.current
        if(!d) return
        animate({
            update: () => {
                d.close()
                RDD.flushSync(() => setIsOpen(false))
            },
            types: ['item'],
        })
    }

    return <>
        <button
            type='button'
            className={s.unbutton + ' ' + s.orderItem}
            onClick={open}
        >
            <div>{D.projects[projectId].title}</div>
        </button>
        {!isOpen &&
            <div className={s.blankCardTransition}>
                <div>
                    <div
                        className={s.cardTransitionBackground + ' ' + s.itemAnimation}
                        style={animStyle(fullBackgroundId)}
                    />
                </div>
            </div>
        }
        <dialog className={s.dialog} ref={dialogRef}>
            <Dialog
                it={it}
                backgroundId={fullBackgroundId}
                isOpen={isOpen}
                close={close}
            />
        </dialog>
    </>
}

function btoa2(str: string) {
    return btoa(str).replaceAll('+', '-').replaceAll('\/', '_').replaceAll('=', '');
}


function Category({ category }: { category: D.Category }) {
    return <div className={s.category}>
        <div className={s.title}>{category.title}</div>
        <div className={s.content}>
            {category.projects.map((it, i) => {
                return <Card key={i} projectId={it}/>
            })}
        </div>
    </div>
}

function animate(arg: any) {
    if(!document.startViewTransition) {
        const updateCallbackDone = Promise.resolve(
            typeof arg === 'function' ? arg() : arg.update()
        ).then(() => undefined);

        return {
            ready: Promise.reject(Error('View transitions unsupported')),
            domUpdated: updateCallbackDone,
            updateCallbackDone,
            finished: updateCallbackDone,
        };
    }

    return document.startViewTransition(arg);
}

function Card({ projectId }: { projectId: D.ProjectId }) {
    const dialogRef = R.useRef<HTMLDialogElement>(null)
    const it = D.projects[projectId]
    const [mouseOver, setMouseOver] = R.useState(false)
    const [hackHover, setHackHover] = R.useState(false)

    const backgroundId = btoa2(R.useId())
    const fullBackgroundId = 'item-' + backgroundId

    const location = useLocation()
    const curLoc = location(it => it.cur)
    const isOpen = curLoc.type === 'index' && curLoc.project === projectId

    const open = () => {
        const d = dialogRef.current
        if(!d) return
        animate({
            update: () => {
                d.showModal()
                RDD.flushSync(() => {
                    const np: Page = { type: 'index', project: projectId }
                    const loc = location.getState()
                    location.setState({ prev: loc.cur, cur: np }, true)
                    history.pushState({}, '', getPathname(np))
                })
            },
            types: ['item'],
        })
    }
    const close = () => {
        const d = dialogRef.current
        if(!d) return
        animate({
            update: () => {
                d.close()
                RDD.flushSync(() => {
                    const np: Page = { type: 'index', project: undefined }
                    const loc = location.getState()
                    location.setState({ prev: loc.cur, cur: np }, true)
                    history.pushState({}, '', getPathname(np))
                })
            },
            types: ['item'],
        })
    }

    /*document.addEventListener('animationstart', (e) => {
        if (e.animationName === s['hover-trigger']) {
            console.log(e.target)
            console.log('CSS :hover matched!');
        }
    });
    document.addEventListener('animationcancel', (e) => {
        if (e.animationName === s['hover-trigger']) {
            console.log(e.target)
            console.log('CSS :hover mismatched!');
        }
    });*/
    const hover = mouseOver || hackHover

    const reactHello = R.useRef<{ el: HTMLElement, listener: () => void }>(undefined)

    return <>
        <button
            type='button'
            className={s.unbutton + ' ' + s.card}
            onClick={open}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}

            onAnimationStart={() => setHackHover(true)}
            ref={it => {
                const prev = reactHello.current
                if(prev) {
                    prev.el.removeEventListener('animationcancel', prev.listener)
                    reactHello.current = undefined
                }

                if(it) {
                    const listener = () => setHackHover(false)
                    it.addEventListener('animationcancel', listener)
                    reactHello.current = { el: it, listener }
                }
            }}
        >
            <div>
                <img className={s.preloadImage} src={it.gifUrl}/>
                <div className={s.content}>
                    {!isOpen &&
                        <div
                            className={s.cardTransitionBackground + ' ' + s.itemAnimation}
                            style={animStyle(fullBackgroundId)}
                        />
                    }
                    <div className={s.content}>
                        <img
                            key={'' + hover}
                            className={s.preview + (hover ? ' ' + s.previewHover : '')}
                            style={{
                                ...(
                                    // @ts-ignore
                                    hover && it.gifFit != null
                                        // @ts-ignore
                                        ? { objectFit: it.gifFit }
                                        : {}
                                )
                            }}
                            src={hover ? it.gifUrl ?? it.preview : it.preview}
                        />
                        <div className={s.title}>{it.title}</div>
                        <div className={s.desc}>{it.desc}</div>
                    </div>
                </div>
            </div>
        </button>
        {/*
            This would've been inside the card.
            But onClick bubbles and the dialog reopens itself 🤡
        */}
        <dialog
            className={s.dialog}
            ref={it => {
                dialogRef.current = it
                if(it && it.open !== isOpen) {
                    if(isOpen) it.showModal()
                    else it.close()
                }
            }}
        >
            <Dialog
                it={it}
                backgroundId={fullBackgroundId}
                isOpen={isOpen}
                close={close}
            />
        </dialog>
    </>
}

type DialogProps = {
    it: D.Project
    close: () => void
    isOpen: boolean
    backgroundId: string
}
function Dialog({ close, isOpen, it, backgroundId }: DialogProps) {
    return <div
        className={s.dialogContainer}
    >
        <div
            onClick={close}
            className={s.backdrop}
        />
        <div className={s.closeButton}>
            <button type='button' className={s.unbutton + ' ' + s.closeIcon}>
                <CloseIcon/>
            </button>
        </div>
        {isOpen &&
            <div
                className={
                    s.content
                        + ' ' + (it.videoVertical ? s.vertical : '')
                        + ' ' + s.itemAnimation
                }
                style={animStyle(backgroundId)}
            >
                <button
                    type='button'
                    className={s.unbutton + ' ' + s.inlineCloseButton}
                    onClick={close}
                >
                    <div className={s.closeIcon}>
                        <CloseIcon/>
                    </div>
                </button>
                <div
                    className={s.video}
                    style={{ ...(it.videoAspectRatio ? { aspectRatio: it.videoAspectRatio } : {}) }}
                >
                    <iframe
                        src={it.videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
                <div className={s.longDesc}>{it.longDesc && <it.longDesc/>}</div>
            </div>
        }
    </div>
}

function CloseIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
}

function Contact() {
    return <div
        className={s.contactBody + ' ' + s.screenAnimation}
        style={animStyle('screen-contact')}
    >
        <div className={s.contactList}>
            <LinkList
                links={[
                    {
                        to: 'https://github.com/vanaigr',
                        brand: faGithub,
                        text: 'github.com/vanaigr',
                    },
                    {
                        to: 'https://www.linkedin.com/in/arandrievskii',
                        brand: faLinkedinIn,
                        text: 'linkedin.com/in/arandrievskii',
                    },
                    {
                        to: 'mailto:aandrievskii@outlook.com',
                        icon: 'mail',
                        text: 'aandrievskii@outlook.com',
                    },
                ]}
            />
        </div>
    </div>
}
