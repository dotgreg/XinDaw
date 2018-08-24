import { css } from 'emotion'

let v = {
    blue: 'blue',
    red: 'red'
}

export const color = {
    blue: css`color: ${v.blue}`,
    red: css`color: ${v.red}`,
}

export const bg = {
    blue: css`background-color: ${v.blue}`,
    red: css`background-color: ${v.red}`,
}

export const border = {
    blue: css`border:1px ${v.blue} solid`,
    red: css`border:1px ${v.red} solid`,
}

