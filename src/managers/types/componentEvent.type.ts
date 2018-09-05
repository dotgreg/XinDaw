import { t } from "./typeCheck";

export const tComponentEvent = t.type({
    id: t.string,
    value: t.number,
    action: t.string,
})
export type iComponentEvent = t.TypeOf<typeof tComponentEvent>;