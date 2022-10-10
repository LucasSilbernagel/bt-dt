import { makeVar } from '@apollo/client'

/** Whether or not the app is displayed in dark mode */
export const darkModeState = makeVar<boolean>(false)
