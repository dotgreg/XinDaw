import { css } from 'emotion'
import { kfGradientBg } from './ressources/keyframes';

export const bgGlow = css `
    background: linear-gradient(0deg,  #d8d8d8,  #efeeee);
    animation: ${kfGradientBg} 1.2s ease infinite;
    background-size: 100% 400%;
`



