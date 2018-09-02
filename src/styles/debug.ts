import { css } from 'emotion'

export const fixedPopup = (width:any = 100) => {
    return css`
        position: fixed;
        top: 0px;
        right: 0px;
        width: ${width}px;
        background: rgba(0,0,0,0.2);
        padding: 10px;
        input {
            width: 100%;
        }
    `
}