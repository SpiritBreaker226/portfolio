export const displayOptions = ['all', 'feature'] as const

export type DisplayOption = typeof displayOptions[number]
