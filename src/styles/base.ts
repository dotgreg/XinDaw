import { css } from 'emotion'


/**
* states
*/
export const states = {
    show : (visible:boolean) => css`display: ${visible ? 'block' : 'none'};`
}

/**
* colors
*/
export const colors = {
    grey1: '#e8e8e8'
}

/**
* fonts
*/
export const fonts = {
    base: css`font-family: monospace, arial, sans-serif`
}

/**
* text
*/
export const text = {
    active: css`
        font-weight: bold;
        text-decoration: underline;
    `
}