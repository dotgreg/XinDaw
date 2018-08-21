export const getToneType = tone => {
    if (typeof tone === 'number') return 'transport-event'
    else if (typeof tone === 'object') return 'loop'

    return false
}