import { t } from "./typeCheck";

export const tSound = t.type({
    id: t.string,
    name: t.string,
    code: t.string,
    edited: t.boolean
})

export type iSound = t.TypeOf<typeof tSound>;