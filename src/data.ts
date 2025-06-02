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

export const projects = {
    timeline: {
        preview: timelinePreview,
        title: 'Job Scheduling',
        desc: 'Web application for optimizing and managing production line schedules',
    },
    dripApp: {
        preview: dripPreview,
        title: 'DripIQ',
        desc: 'Smart hydration tracking app built with React Native',
    },
    groupTimetable: {
        preview: groupTimetablePreview,
        title: 'Group Timetable',
        desc: 'Scheduling website for students in cohort-based programs',
    },
    rainwatcher: {
        preview: rainwatcherPreview,
        title: 'Rain World, The Watcher DLC Map',
        desc: 'First interactive map website for the Watcher DLC',
    },
    minishoot: {
        preview: minishootPreview,
        title: 'Minishoot\` Adventures Map',
        desc: 'The most complete interactive map for Minishoot\' Adventures',
    },
    lumaflyKnight: {
        preview: lumaflyKnightPreview,
        title: 'Lumafly Knight',
        desc: 'Hollow Knight mod that tracks rescued lumaflies with in-game integration',
    },
    minceraft: {
        preview: minceraftPreview,
        title: 'Minceraft Clone',
        desc: 'Minecraft clone with real-time ray tracing rendering',
    },
    gol: {
        preview: golPreview,
        title: 'Game of Life',
        desc: 'High-performance simulation of Conway\'s Game of Life',
    },
    airlineTicketing: {
        preview: airlineTicketingPreview,
        title: 'Flight Reservation System',
        desc: 'C# client-server desktop application for booking and managing airline tickets',
    },
    easyword: {
        preview: easywordPreview,
        title: 'Easyword',
        desc: 'Neovim plugin for navigating to any visible word with minimal keystrokes',
    },
    uniboard: {
        preview: uniboardPreview,
        title: 'Uniboard',
        desc: 'Feature-rich, fully customizable Android keyboard',
    },
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
