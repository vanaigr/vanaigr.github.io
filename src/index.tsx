import R from 'react'
import RD from 'react-dom/client'

import '@/index.css'
import s from './index.module.css'
import * as D from './data'

const root = RD.createRoot(document.getElementById('root')!)
root.render(<App/>)

function App() {
    return <div className={s.app}>
        <div className={s.categories}>
            {D.categories.map((it, i) => {
                return <Category key={i} category={it}/>
            })}
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
    const it = D.projects[projectId]
    return <div className={s.card}>
        <div>
            <img className={s.preview} src={it.preview}/>
            <div className={s.title}>{it.title}</div>
            <div className={s.desc}>{it.desc}</div>
        </div>
    </div>
}
