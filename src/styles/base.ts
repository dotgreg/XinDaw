import { css } from 'emotion'
import { colors } from './ressources/uiKit';

export const show = (visible:boolean) => css`
    display: ${visible ? 'block' : 'none'};
`

export const color = {
    blue: css`color: ${colors.blue}`,
    red: css`color: ${colors.red}`,
}

export const bg = {
    blue: css`background-color: ${colors.blue}`,
    red: css`background-color: ${colors.red}`,
}

export const border = {
    blue: css`border:1px ${colors.blue} solid`,
    red: css`border:1px ${colors.red} solid`,
}

