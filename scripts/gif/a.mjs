import fs from 'node:fs'
import p from 'node:path'
import cp from 'node:child_process'

const startSkip = 0
const maxDur = 40

const outDur = 5
const outFps = 10

//const fns = ['lumaflyKnight.mp4']
const fns = fs.readdirSync('.').filter(it => it.endsWith('.mp4'))

for(const fn of fns) {
    var s = cp.spawnSync(
        'ffprobe',
        [
            '-v',
            'error',
            '-show_entries',
            'format=duration',
            '-of',
            'default=noprint_wrappers=1:nokey=1',
            fn,
        ],
    )
    let dur = parseFloat(s.stdout.toString('utf8'))
    dur = Math.min(dur, maxDur)
    const speed = outDur / dur

    const tmp = p.join('2', fn)
    cp.spawnSync(
        'ffmpeg',
        [
            '-i',
            fn,
            '-vf',
            'setpts=' + speed + '*PTS',
            '-an',
            '-ss', startSkip,
            '-r', outFps,
            '-t', outDur,
            '-y',
            tmp,
        ],
        { stdio: 'inherit' }
    )

    cp.spawnSync(
        'ffmpeg',
        [
            '-i',
            tmp,
            '-vf',
            'fps=' + outFps + ',scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',
            '-y',
            p.join('out', fn.substring(0, fn.length - 4) + '.gif')
        ],
        { stdio: 'inherit' }
    )
}
