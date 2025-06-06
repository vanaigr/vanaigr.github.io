import type { ReactNode } from 'react'

import timelinePreview from '@/previews/timeline.png'
import dripPreview from '@/previews/drip.png'
import minishootPreview from '@/previews/minishoot.png'
import rainwatcherPreview from '@/previews/rainwatcher.png'
import groupTimetablePreview from '@/previews/groupTimetable.png'
import lumaflyKnightPreview from '@/previews/lumaflyKnight.png'
import minceraftPreview from '@/previews/mince.png'
import golPreview from '@/previews/gol.png'
import airlineTicketingPreview from '@/previews/airline.png'
import uniboardPreview from '@/previews/uniboard.png'
import easywordPreview from '@/previews/easyword.png'

import * as longDescs from './longDescs.tsx'

export const projects = {
    timeline: {
        date: '2025-03',
        preview: timelinePreview,
        title: 'Job Scheduling',
        desc: 'Web application for optimizing and managing production line schedules',
        videoUrl: 'https://www.youtube.com/embed/VtPjKyAMf8U?si=ECXoQreR2DpN0P5q',
        longDesc: longDescs.Timeline,
    },
    dripApp: {
        date: '2025-01',
        preview: dripPreview,
        title: 'DripIQ',
        desc: 'Smart hydration tracking app built with React Native',
        videoUrl: 'https://www.youtube.com/embed/uTM_SZ5AVNY?si=ayQ1GzAQ_Qsa_bUQ',
        longDesc: longDescs.DripApp,
        videoVertical: true,
    },
    groupTimetable: {
        date: '2023-08',
        preview: groupTimetablePreview,
        title: 'Group Timetable',
        desc: 'Scheduling website for students in cohort-based programs',
        videoUrl: 'https://www.youtube.com/embed/sGKQyrWy2o8?si=40E2Dz-cCWdlFs9P',
        longDesc: longDescs.GroupTimetable,
    },
    rainwatcher: {
        date: '2023-04',
        preview: rainwatcherPreview,
        title: 'Rain World: The Watcher DLC Map',
        desc: 'First interactive map website for the Watcher DLC',
        videoUrl: 'https://www.youtube.com/embed/oCP7F5N5Ulk?si=taSMgMY9fXRZWjQH',
        longDesc: longDescs.Rainwatcher,
    },
    minishoot: {
        date: '2024-08',
        preview: minishootPreview,
        title: 'Minishoot\` Adventures Map',
        desc: 'The most complete interactive map for Minishoot\' Adventures',
        videoUrl: 'https://www.youtube.com/embed/5vnKPzF1OnE?si=KOTEeWJ5kOj81ApU',
        longDesc: longDescs.Minishoot,
    },
    lumaflyKnight: {
        date: '2025-01',
        preview: lumaflyKnightPreview,
        title: 'Lumafly Knight',
        desc: 'Hollow Knight mod that tracks rescued lumaflies with in-game integration',
        videoUrl: 'https://www.youtube.com/embed/FxI1s5dZCs0?si=xVfPnDLYmrUc06yC',
        longDesc: longDescs.Lumafly,
    },
    minceraft: {
        date: '2022-01',
        preview: minceraftPreview,
        title: 'Minceraft Clone',
        desc: 'Minecraft clone with real-time ray tracing rendering',
        videoUrl: 'https://www.youtube.com/embed/xjYQW5gW2bc?si=A2kjD1j0v9IThC4C',
        longDesc: longDescs.Minceraft,
    },
    gol: {
        date: '2021-11',
        preview: golPreview,
        title: 'Game of Life',
        desc: 'High-performance simulation of Conway\'s Game of Life',
        videoUrl: 'https://www.youtube.com/embed/GBlErSSwmYw?si=Ss5RDDtZiP_wNz-C',
        longDesc: longDescs.Life,
    },
    airlineTicketing: {
        date: '2022-09',
        preview: airlineTicketingPreview,
        title: 'Flight Reservation System',
        desc: 'C# client-server desktop application for booking and managing airline tickets',
        videoUrl: 'https://www.youtube.com/embed/RYEu70H6YNQ?si=WnokGyXGu2BCYHYs',
        longDesc: longDescs.Airline,
    },
    easyword: {
        date: '2023-11',
        preview: easywordPreview,
        title: 'Easyword',
        desc: 'Neovim plugin for navigating to any visible word with minimal keystrokes',
        videoUrl: 'https://www.youtube.com/embed/qB3O8z20qlk?si=n9hhGYStLuPvmmrw',
        longDesc: longDescs.Easyword,
    },
    uniboard: {
        date: '2020-11',
        preview: uniboardPreview,
        title: 'Uniboard',
        desc: 'Feature-rich, fully customizable Android keyboard',
        videoUrl: 'https://www.youtube.com/embed/8VFX-hQFilQ?si=RU9fC6GbnlbMtnLM',
        videoVertical: true,
        videoAspectRatio: '9 / 16',
        longDesc: longDescs.Uniboard,
    },
} as const satisfies Record<string, Project>

const projectIds = Object.keys(projects) as ProjectId[]

const order = projectIds.sort((a, b) => {
    const ad = projects[a].date
    const bd = projects[b].date
    return -(ad < bd ? -1 : ad === bd ? 0 : 1)
})

export const projectsByYear: { year: string, projects: ProjectId[] }[] = []
for(const pid of order) {
    const lastGroup = projectsByYear.at(-1)
    const p = projects[pid]
    const year = p.date.substring(0, 4)

    if(!lastGroup || lastGroup.year !== year) {
        projectsByYear.push({
            year,
            projects: [pid],
        })
    }
    else {
        lastGroup.projects.push(pid)
    }
}

export type Project = {
    preview: string
    title: string
    desc: string
    date: string
    videoUrl?: string
    longDesc?: () => ReactNode
    videoVertical?: boolean
    videoAspectRatio?: string
}

export type ProjectId = keyof typeof projects

export const categories: Category[] = [
    {
        title: 'Web',
        projects: [
            'timeline',
            'dripApp',
            'minishoot',
            'rainwatcher',
            'groupTimetable',
        ]
    },
    {
        title: 'Desktop Apps & Games',
        projects: [
            'lumaflyKnight',
            'minceraft',
            'gol',
            'airlineTicketing',
        ],
    },
    {
        title: 'Misc',
        projects: [
            'easyword',
            'uniboard',
        ],
    },
] as const

export type Category = {
    title: string
    projects: Array<ProjectId>
}
