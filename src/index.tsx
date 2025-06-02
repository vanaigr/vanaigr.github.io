import R from 'react'
import RDD from 'react-dom'
import RD from 'react-dom/client'
import * as Z from 'zustand'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faCopy } from '@fortawesome/free-regular-svg-icons'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import '@/index.css'
import s from './index.module.css'
import * as D from './data'

library.add({ faGithub })

const root = RD.createRoot(document.getElementById('root')!)
root.render(<Router/>)

const order = ['index', 'contact'] as const
type Page = (typeof order)[number]

type Location = {
    prev: Page
    cur: Page
    transition: 'left' | 'right' | undefined
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
        const res = animate(() => {
            const transition = newI < curI ? 'left' : 'right'
            RDD.flushSync(() => {
                location.setState({ transition })
            })
            RDD.flushSync(() => {
                location.setState({ prev: p, cur: newP, transition }, true)
            })
        })

        if(res) {
            res.finished.then(() => {
                location.setState({ transition: undefined })
            })
        }
        return
    }

    location.setState({
        prev: p,
        cur: newP,
        transition: undefined,
    }, true)
}

function Wrapper({ children }: { children: R.ReactNode }) {
    const location = useLocation()

    return <div className={s.app}>
        <div className={s.header}>
            <a
                className={s.headerLink}
                href='/'
                style={{ textDecoration: 'underline' }}
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

function useTransitionDirection(name: Page, location: LocationStore) {
    const cur = location(it => it.cur)
    const dir = location(it => it.transition)
    if(dir) {
        return {
            viewTransitionName: 'screen-' + dir + '-' + (cur === name ? 'to' : 'from'),
        }
    }
    else {
        return {}
    }
}

function App() {
    const location = useLocation()
    const dir = useTransitionDirection('index', location)
    console.log('index direction', dir)

    return <div className={s.body} style={dir}>
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

function animate(func: () => void) {
    if(document.startViewTransition) {
        return document.startViewTransition(() => {
            return func()
        })
    }
    else {
        func()
    }
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
        animate(() => {
            d.showModal()
            RDD.flushSync(() => setIsOpen(true))
        })
    }
    const close = () => {
        const d = dialogRef.current
        if(!d) return
        animate(() => {
            d.close()
            RDD.flushSync(() => setIsOpen(false))
        })
    }

    return <>
        <div
            className={s.card}
            onClick={open}
        >
            {!isOpen &&
                <div
                    className={s.cardTransitionBackground}
                    style={{ viewTransitionName: fullBackgroundId }}
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
                className={s.content}
                style={{ viewTransitionName: backgroundId }}
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
    const location = useLocation()
    const dir = useTransitionDirection('contact', location)
    console.log('contact direction', dir)

    return <div className={s.contactBody} style={dir}>
        <div>
            <div className={s.title}>
                Artem Andrievskii
            </div>

            <div className={s.linkList}>
                <Item
                    to='https://github.com/vanaigr'
                    icon={faGithub}
                    text='github.com/vanaigr'
                />
                <Item
                    to='https://www.linkedin.com/in/arandrievskii'
                    icon={faLinkedinIn}
                    text='linkedin.com/in/arandrievskii'
                />
                <Item
                    to='mailto:aandrievskii@outlook.com'
                    icon={faEnvelope}
                    text='aandrievskii@outlook.com'
                />
            </div>
        </div>
    </div>
}

function Item({ to, icon, text }: { to: string, icon: typeof faGithub, text: string }) {
    return <div className={s.externalItem}>
        <External to={to}>
            <FontAwesomeIcon
                className={s.icon}
                icon={icon}
            />
            <div>{text}</div>
        </External>
        <div className={s.copy}>
            <div>
                <FontAwesomeIcon
                    className={s.icon}
                    icon={faCopy}
                />
            </div>
        </div>
    </div>
}

function External({ to, children }: { to: string, children: R.ReactNode }) {
    return <a className={s.external} href={to} target='_blank'>
        {children}
    </a>
}
