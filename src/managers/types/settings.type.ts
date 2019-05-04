import { t } from "./typeCheck";

export const tSettingsItem = t.type({
    type: t.string,
    value: t.number,
    key: t.string,
})
export type iSettingsItem = t.TypeOf<typeof tSettingsItem>;