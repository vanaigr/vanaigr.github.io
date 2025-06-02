import timelinePreview from '@/previews/timeline.png'
import dripPreview from '@/previews/drip.png'
import minishootPreview from '@/previews/minishoot.png'
import rainwatcherPreview from '@/previews/rainwatcher.png'
import groupTimetablePreview from '@/previews/groupTimetable.png'

export const projects = {
    timeline: {
        preview: timelinePreview,
        title: 'Job Scheduling',
        desc: 'Web app for production line scheduling',
    },
    dripApp: {
        preview: dripPreview,
        title: 'DripIQ',
        desc: 'smart hydration platform, React Native app'
    },
    groupTimetable: {
        preview: groupTimetablePreview,
        title: 'Group Timetable',
        desc: 'Scheduling website for students in cohort-based programs',
    },
    rainwatcher: {
        preview: rainwatcherPreview,
        title: 'Rain World, The Watcher DLC Map',
        desc: 'First Watcher DLC map',
    },
    minishoot: {
        preview: minishootPreview,
        title: 'Minishoot\` Adventures Map',
        desc: 'The most complete video game website',
    },
    lumaflyKnight: {},
    easyword: {},
    airlineTicketing: {},
    minceraft: {},
    gol: {},
    uniboard: {},
} as const satisfies Record<string, Project>

export type Project = {
    preview: string
    title: string
    desc: string
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
