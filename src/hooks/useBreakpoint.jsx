import { getCSSVariable } from '../utils/utils'

import useMedia from './useMedia'

const useBreakpoint = () => {

    const breakpoints = {
        sm: getCSSVariable(`--breakpoint-sm`),
        md: getCSSVariable(`--breakpoint-md`),
        lg: /*getCSSVariable(`--breakpoint-lg`)*/'56rem',
        xl: getCSSVariable(`--breakpoint-xl`),
        '2xl': getCSSVariable(`--breakpoint-2xl`),
    }

    const sm = useMedia(`(min-width: ${breakpoints.sm})`)
    const md = useMedia(`(min-width: ${breakpoints.md})`)
    const lg = useMedia(`(min-width: ${breakpoints.lg})`)
    const xl = useMedia(`(min-width: ${breakpoints.xl})`)
    const xxl = useMedia(`(min-width: ${breakpoints['2xl']})`)

    return { sm, md, lg, xl, xxl }
}

export default useBreakpoint
