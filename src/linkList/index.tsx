import R from 'react'
import RD from 'react-dom'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Globe, Mail } from 'lucide-react'

import s from './index.module.css'

export type IconName = 'globe' | 'mail'

export type Link = {
    to: string
    brand?: IconDefinition
    icon?: IconName
    text: string
}

export default function C({ links }: { links: Link[] }) {
    return <div className={s.linkList + ' flex flex-col font-[Lato] [--gap:1rem] gap-(--gap) px-[calc(var(--gap)*0.5)]'}>
        {links.map((it, i) => {
            return <Item key={i} it={it}/>
        })}
    </div>
}

function Item({ it }: { it: Link }) {
    const [copied, setCopied] = R.useState<boolean | undefined>(undefined)

    const { to, brand, icon, text } = it
    return <div className={s.externalItem + ' [--paddingHorizontal:0.5rem] my-[calc(var(--gap)*-0.5)] mx-[calc(var(--paddingHorizontal)*-1)] flex flex-row'}>
        <External to={to}>
            <div>
                {brand &&
                    <FontAwesomeIcon
                        className={s.icon}
                        icon={brand}
                    />
                }
                {icon && (() => {
                    const Component = iconMap(icon)
                    return <Component className={s.icon}/>
                })()}
                <div>{text}</div>
            </div>
        </External>
        <button
            type='button'
            className={
                s.copy
                    + (copied === true ? ` ${s.copySuccess}` : '')
                    + (copied === false ? ` ${s.copyFail}` : '')
            }
            onClick={async() => {
                RD.flushSync(() => setCopied(undefined))
                // This async...
                try {
                    await navigator.clipboard.writeText(to)
                    setCopied(true)
                }
                catch(err) {
                    setCopied(false)
                }
            }}
        >
            <div>
                <FontAwesomeIcon
                    className={s.icon}
                    icon={faCopy}
                />
            </div>
        </button>
    </div>
}

function External({ to, children }: { to: string, children: R.ReactNode }) {
    return <a className={s.external + ' py-[calc(var(--gap)*0.5)] px-(--paddingHorizontal) ml-[calc(var(--paddingHorizontal)*-1)] pl-(--paddingHorizontal) flex flex-row flex-[1_1_0] text-inherit items-center gap-2 leading-none break-all'} href={to} target='_blank'>
        {children}
    </a>
}

function iconMap(name: IconName) {
    if(name === 'globe') return Globe
    else return Mail
}
