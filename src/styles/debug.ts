import { css } from 'emotion'

export const fixedPopup = (width:any = 100) => {
    return css`
        position: fixed;
        top: 0px;
        right: 0px;
        width: ${width}px;
        background: rgba(0,0,0,0.2);
        font-size: 12px;
        padding: 10px;
        p {
            margin: 0px;
            margin-bottom: 10px;
            font-weight: bold;
        }
        input {
            width: 100%;
        }
    `
}