import R from 'react'
import RD from 'react-dom'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Globe, Mail } from 'lucide-react'

export type IconName = 'globe' | 'mail'

export type Link = {
    to: string
    brand?: IconDefinition
    icon?: IconName
    text: string
}

export default function C({ links, className }: { links: Link[], className?: string }) {
    return <div className={'flex flex-col font-[Lato] [--gap:1rem] gap-(--gap) px-[calc(var(--gap)*0.5)] ' + (className ?? '')}>
        {links.map((it, i) => {
            return <Item key={i} it={it}/>
        })}
    </div>
}

function Item({ it }: { it: Link }) {
    const [copied, setCopied] = R.useState<boolean | undefined>(undefined)

    const { to, brand, icon, text } = it
    return <div className={'[--paddingHorizontal:0.5rem] my-[calc(var(--gap)*-0.5)] mx-[calc(var(--paddingHorizontal)*-1)] flex flex-row'}>
        <External to={to}>
            <div className='flex gap-2'>
                {brand &&
                    <FontAwesomeIcon
                        className={'h-[1.1rem] w-[1.1rem]'}
                        icon={brand}
                    />
                }
                {icon && (() => {
                    const Component = iconMap(icon)
                    return <Component className={'h-[1.1rem] w-[1.1rem]'}/>
                })()}
                <div>{text}</div>
            </div>
        </External>
        <button
            type='button'
            className={
                    'group/copy [background:none] [border:none] p-0 m-0 cursor-pointer flex text-(--primary-darker) [animation-duration:0.4s] [animation-timing-function:cubic-bezier(0.18,0.89,0.32,1.28)]'
                    + (copied === true ? ` [--anim-color:green] [animation-name:scaleAndColor]` : '')
                    + (copied === false ? ` [--anim-color:red] [animation-name:scaleAndColor]` : '')
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
            <div className='flex-1 px-2 flex items-center justify-center text-(--muted) opacity-50 transition-[transform,color,opacity] duration-100 group-hover/copy:text-inherit group-hover/copy:opacity-100'>
                <FontAwesomeIcon
                    className={'h-4'}
                    icon={faCopy}
                />
            </div>
        </button>
    </div>
}

function External({ to, children }: { to: string, children: R.ReactNode }) {
    return <a className={'py-[calc(var(--gap)*0.5)] px-(--paddingHorizontal) ml-[calc(var(--paddingHorizontal)*-1)] pl-(--paddingHorizontal) flex flex-row flex-[1_1_0] text-inherit items-center gap-2 leading-none break-all underline my-list-link'} href={to} target='_blank'>
        {children}
    </a>
}

function iconMap(name: IconName) {
    if(name === 'globe') return Globe
    else return Mail
}
