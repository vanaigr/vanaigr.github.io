import R from 'react'
import RDD from 'react-dom'
import RD from 'react-dom/client'
import * as Z from 'zustand'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import '@/global.css'
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

    const headerLink = 'cursor-pointer -my-4 py-4 mx-[calc(var(--gap)*-0.5)] px-[calc(var(--gap)*0.5)] my-header-link no-underline'

    return <div
        className='overflow-y-scroll flex flex-1 basis-0 flex-col text-black '
        style={{
            '--side-width': '14rem',
        } as any}
    >
        <div className='font-[Noto_Sans] leading-none text-[1.1rem] flex p-4 [--gap:--spacing(8)] gap-(--gap) mb-8 max-sm:flex-col max-sm:[--gap:--spacing(6)]'>
            <div className='flex-1 flex max-sm:justify-center'>
                <span>Artem Andrievskii</span>
            </div>
            <div className='flex justify-center gap-(--gap)'>
                <a
                    className={headerLink}
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
                    className={headerLink}
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
            <div className='flex-1 max-sm:hidden'/>
        </div>
        {children}
        <div className='flex p-4 pt-8 justify-center flex-wrap gap-4 font-[Noto_Sans] leading-none text-muted'>
            <div>Generated {gen}</div>
            <div>
                Source: <a
                    className='text-muted'
                    href='https://github.com/vanaigr/vanaigr.github.io'
                >
                    github.com/vanaigr/vanaigr.github.io
                </a>
            </div>
        </div>
    </div>
}

function App() {
    return <div
        className='flex flex-1 basis-0 max-xl:flex-col max-xl:items-center max-xl:gap-20 max-sm:items-stretch'
        style={animStyle('screen-index')}
    >
        <div className='max-xl:hidden basis-(--side-width)'/>
        <div className='grow-1 flex flex-col gap-16 items-center px-4 max-sm:items-stretch'>
            {D.categories.map((it, i) => {
                return <Category key={i} category={it}/>
            })}
        </div>
        <div className='flex flex-col xl:min-w-(--side-width) xl:w-(--side-width) font-[Roboto_Condensed] px-2 pb-8'>
            <OrderMenu/>
        </div>
    </div>
}

function OrderMenu() {
    return <div className='sticky top-8 flex flex-col gap-6'>
        <div className='max-xl:text-center'>In chronological order</div>
        {D.projectsByYear.map((it, i) => {
            return <div key={i} className='flex flex-col'>
                <div className='flex flex-col cursor-pointer [--gap:0.7rem] gap-(--gap)'>
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
            className='font-[Roboto_Condensed] -mr-2 pr-2 -ml-8 pl-8 mb-[calc(var(--gap)*-1)] pb-(--gap) my-order-link text-left'
            onClick={open}
        >
            <div>{D.projects[projectId].title}</div>
        </button>
        {!isOpen &&
            <div className='fixed inset-0 flex justify-center items-center pointer-events-none'>
                <div className='relative w-80 h-120'>
                    <div
                        className={'absolute inset-0 rounded-2xl ' + s.itemAnimation}
                        style={animStyle(fullBackgroundId)}
                    />
                </div>
            </div>
        }
        <dialog className={s.dialog + ' open:[background:none] open:border-0'} ref={dialogRef}>
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
    return <div className='flex flex-col gap-4 sm:gap-2'>
        <div className='font-Noto_Sans text-2xl pb-4 border-b border-b-gray-500'>{category.title}</div>
        <div className='grid grid-cols-[repeat(3,1fr)] max-xl:grid-cols-[repeat(2,1fr)] gap-x-2 gap-y-4 max-sm:grid-cols-[1fr]'>
            {category.projects.map((it, i) => {
                return <Card key={i} projectId={it}/>
            })}
        </div>
    </div>
}

const viewTransitionSupported = (() => {
    // Firefox has the function but it doesn't support the argument.
    // I don't know how to check for that other than running a transition.
    try {
        document.startViewTransition({
            update: () => { throw {} },
            types: ['someName']
        } as any)
    }
    catch(err) {
        console.warn('View transitions are not supported:', err)
        return false
    }
    return true
})()

type ViewTransitionProps = {
    update: () => void | Promise<unknown>
    types: string[]
}// | (() => void)

function animate(arg: ViewTransitionProps) {
    if(!viewTransitionSupported) {
        ;(async() => arg.update())()
        return
    }

    document.startViewTransition(arg as any/*old types*/);
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
            className='text-left group hover:before:content-[""] hover:before:[animation:hover-trigger_0.001s_infinite]'
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
            <div className='flex flex-col cursor-pointer relative'>
                <div className='flex justify-center max-sm:mx-[calc((1rem+8px)*-1)]'>
                    {!isOpen &&
                        <div
                            className={'absolute inset-0 rounded-2xl ' + s.itemAnimation}
                            style={animStyle(fullBackgroundId)}
                        />
                    }
                    <div className='flex flex-col rounded-2xl pt-8 px-4 pb-4 border-[0.3rem] border-transparent translate-y-0 bg-transparent [--dur:0.3s] [transition:transform_var(--dur),border-color_var(--dur),background_var(--dur)] group-hover:-translate-y-[0.2rem]'>
                        <div className='grid aspect-[16/9] rounded-[0.4rem] shadow-[0px_0px_0.4rem_0px_#00000005] w-64 max-sm:w-[calc(100vw-6rem)]'>
                            <img
                                className='aspect-[16/9] row-start-1 col-start-1 rounded-[0.4rem] w-full h-full'
                                src={it.gifUrl}
                                style={{
                                    ...(it.gifFit != null
                                        ? { objectFit: it.gifFit }
                                        : {}
                                    ),
                                    display: hover ? 'block' : 'none',
                                }}
                            />
                            <img
                                key={'' + hover}
                                className='aspect-[16/9] row-start-1 col-start-1 rounded-[0.4rem] w-full h-full object-cover'
                                src={hover ? it.gifUrl ?? it.preview : it.preview}
                                style={{
                                    display: !hover ? 'block' : 'none',
                                }}
                            />
                        </div>
                        <div className='mt-[0.6rem] mb-[0.2rem] font-[Noto_Sans] text-base font-bold leading-[1.5] text-[#121505] w-64 max-sm:w-[calc(100vw-6rem)]'>{it.title}</div>
                        <div className='font-[Noto_Sans] text-[0.9rem] font-semibold leading-[1.5] text-muted h-[calc(0.9rem*1.5*2)] overflow-hidden w-64 max-sm:w-[calc(100vw-6rem)]'>{it.desc}</div>
                    </div>
                </div>
            </div>
        </button>
        {/*
            This would've been inside the card.
            But onClick bubbles and the dialog reopens itself 🤡
        */}
        <dialog
            className={s.dialog + ' open:[background:none] open:border-0'}
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
        className={s.dialogContainer + ' w-full min-h-full flex flex-col items-center'}
    >
        <div
            onClick={close}
            style={{ position: 'absolute', inset: '0px', cursor: 'pointer' }}
        />
        <div className={s.closeButton + ' pointer-events-none absolute right-0 top-0 py-4 px-12'}>
            <button type='button' className={'text-left fixed ' + s.closeIcon}>
                <CloseIcon/>
            </button>
        </div>
        {isOpen &&
            <div
                className={
                    s.content
                        + ' relative w-[max(60rem,66%)] max-[75rem]:w-[40rem] max-w-[calc(100%-2rem)] grow my-4 rounded-[1rem] overflow-hidden bg-white flex flex-col'
                        + ' ' + (it.videoVertical ? s.vertical + ' flex-row' : '')
                        + ' ' + s.itemAnimation
                }
                style={animStyle(backgroundId)}
            >
                <button
                    type='button'
                    className={'text-left hidden top-4 ' + s.inlineCloseButton}
                    onClick={close}
                >
                    <div className={s.closeIcon}>
                        <CloseIcon/>
                    </div>
                </button>
                <div
                    className={s.video + (it.videoVertical ? ' aspect-[9/18] h-[calc(100vh-2rem)]' : ' aspect-video')}
                    style={{ ...(it.videoAspectRatio ? { aspectRatio: it.videoAspectRatio } : {}) }}
                >
                    <iframe
                        className='w-full h-full'
                        src={it.videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
                <div className={s.longDesc + ' grow m-8 font-[Noto_Sans] flex flex-col'}>{it.longDesc && <it.longDesc/>}</div>
            </div>
        }
    </div>
}

function CloseIcon() {
    return <svg className='text-white w-8 opacity-80' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
}

function Contact() {
    return <div
        className={s.contactBody + ' grow bg-(--bg) flex justify-center min-w-max ' + s.screenAnimation}
        style={animStyle('screen-contact')}
    >
        <div className={s.contactList + ' flex flex-col max-w-[50rem] gap-4'}>
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
