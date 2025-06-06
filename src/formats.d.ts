namespace global {
    declare module '*.module.css' {
        const v: Record<string, string>
        export default v
    }

    declare module '*.png' {
        const v: string
        export default v
    }
}
