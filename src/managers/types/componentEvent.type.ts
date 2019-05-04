import { t } from "./typeCheck";

export const tComponentEvent = t.type({
    id: t.string,
    action: t.string,
    value: t.number,
    state: t.number,
})
export type iComponentEvent = t.TypeOf<typeof tComponentEvent>;