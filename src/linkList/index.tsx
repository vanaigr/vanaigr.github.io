import type { ReactNode } from 'react'
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
    return <div className={s.linkList}>
        {links.map((it, i) => {
            return <Item key={i} it={it}/>
        })}
    </div>
}

function Item({ it }: { it: Link }) {
    const { to, brand, icon, text } = it
    return <div className={s.externalItem}>
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

function External({ to, children }: { to: string, children: ReactNode }) {
    return <a className={s.external} href={to} target='_blank'>
        {children}
    </a>
}

function iconMap(name: IconName) {
    if(name === 'globe') return Globe
    else return Mail
}
