import { t } from "./typeCheck";

export const tError = t.type({
    code: t.number,
    message: t.string,
})

export type iError = t.TypeOf<typeof tError>;