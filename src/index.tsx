import R from 'react'
import RD from 'react-dom/client'
import * as RR from 'react-router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faCopy } from '@fortawesome/free-regular-svg-icons'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

import '@/index.css'
import s from './index.module.css'
import * as D from './data'

library.add({ faGithub })

const router = RR.createBrowserRouter([
    {
        Component: Wrapper,
        children: [
            {
                path: '/',
                Component: App,
            },
            {
                path: '/contact',
                Component: Contact,
            },
        ]
    },
])

const root = RD.createRoot(document.getElementById('root')!)
root.render(<RR.RouterProvider router={router}/>)

function Wrapper() {
    return <div className={s.app}>
        <div className={s.header}>
            <RR.Link
                className={s.headerLink}
                to='/'
                style={{ textDecoration: 'underline' }}
            >
                <div>Programming</div>
            </RR.Link>
            <RR.Link
                className={s.headerLink}
                to='/contact'
            >
                <div>Contact</div>
            </RR.Link>
        </div>
        <RR.Outlet/>
    </div>
}

function App() {
    return <div className={s.body}>
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

function Card({ projectId }: { projectId: D.ProjectId }) {
    const dialogRef = R.useRef<HTMLDialogElement>(null)
    const it = D.projects[projectId]

    return <>
        <div
            className={s.card}
            onClick={() => {
                const d = dialogRef.current
                if(!d) return
                d.showModal()
            }}
        >
            <div>
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
            <div onClick={() => {
                const d = dialogRef.current
                if(!d) return
                d.close()
            }}>
                <div>test</div>
            </div>
        </dialog>
    </>
}

function Contact() {
    return <div className={s.contactBody}>
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
