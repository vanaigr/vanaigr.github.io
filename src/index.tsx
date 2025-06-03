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
type Page = (typeof order)[number]

type Location = {
    prev: Page
    cur: Page
}

function getPage(pathname: string): Page {
    const p = pathname
    if(p === '/contact') {
        return 'contact'
    }
    else {
        return 'index'
    }
}
function getPathname(page: Page) {
    if(page === 'index') return '/'
    else return '/contact'
}

type LocationStore = Z.UseBoundStore<Z.StoreApi<Location>>
const locationContext = R.createContext<LocationStore>(undefined as never)
function useLocation() {
    return R.useContext(locationContext)
}

function Router() {
    const store = R.useState(() => {
        const loc = getPage(window.location.pathname)
        return Z.create<Location>(() => {
            return { prev: loc, cur: loc, transition: undefined }
        })
    })[0]
    R.useEffect(() => {
        const listener = () => {
            const loc = getPage(window.location.pathname)
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
    if(loc === 'index') {
        return <Wrapper><App/></Wrapper>
    }
    else {
        return <Wrapper><Contact/></Wrapper>
    }
}

function updDirection(newP: Page, location: LocationStore) {
    const p = location.getState().cur

    const newI = order.indexOf(newP)
    const curI = order.indexOf(p)
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

    return <div className={s.app}>
        <div className={s.header}>
            <a
                className={s.headerLink}
                href='/'
                style={loc === 'index' ? { textDecoration: 'underline' } : {}}
                onClick={it => {
                    it.preventDefault()
                    updDirection('index', location)
                    history.pushState({}, '', getPathname('index'))
                }}
            >
                <div>Programming</div>
            </a>
            <a
                className={s.headerLink}
                style={loc === 'contact' ? { textDecoration: 'underline' } : {}}
                onClick={it => {
                    it.preventDefault()
                    updDirection('contact', location)
                    history.pushState({}, '', getPathname('contact'))
                }}
                href='/contact'
            >
                <div>Contact</div>
            </a>
        </div>
        {children}
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
            <div>
                <div className={s.title}>In chronological order</div>
                {D.projectsByYear.map((it, i) => {
                    return <div key={i} className={s.orderList}>
                        {/*<div className={s.title}>
                            {it.year}
                        </div>*/}
                        <div className={s.list}>
                            {it.projects.map((it, i) => {
                                return <div key={i}>
                                    <div>{D.projects[it].title}</div>
                                </div>
                            })}
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
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

    const backgroundId = R.useId()
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
        <div
            className={s.card}
            onClick={open}
        >
            {!isOpen &&
                <div
                    className={s.cardTransitionBackground + ' ' + s.itemAnimation}
                    style={animStyle(fullBackgroundId)}
                />
            }
            <div className={s.content}>
                <img className={s.preview} src={it.preview}/>
                <div className={s.title}>{it.title}</div>
                <div className={s.desc}>{it.desc}</div>
            </div>
        </div>
        {/*
            This would've been inside the card.
            But onClick bubbles and the dialog reopens itself 🤡
        */}
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
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </div>
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
                <iframe
                    className={s.video}
                    src={it.videoUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
                <div className={s.longDesc}>{it.longDesc && <it.longDesc/>}</div>
            </div>
        }
    </div>

}

function Contact() {
    return <div
        className={s.contactBody + ' ' + s.screenAnimation}
        style={animStyle('screen-contact')}
    >
        <div>
            <div className={s.title}>
                Artem Andrievskii
            </div>

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
