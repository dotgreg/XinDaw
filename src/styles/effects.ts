import { css } from 'emotion'
import { kfGradientBg } from './ressources/keyframes';

export const bgGlow = css `
    background: linear-gradient(0deg,  #d8d8d8,  #efeeee);
    animation: ${kfGradientBg} 1.2s ease infinite;
    background-size: 100% 400%;
`

export const transitions = {
    transition1: css` transition: all .3s cubic-bezier(.55,0,.1,1) `
}   


