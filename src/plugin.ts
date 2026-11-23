import type { PluginClass } from 'ultimate-crosscode-typedefs/modloader/mod'
import { setModMetadata } from './mod-metadata'
import type { Mod1 } from './types'
import { registerOpts } from './options'
import { addWidgets } from './character-widgets'

export default class CharacterWidgets implements PluginClass {
    constructor(mod: Mod1) {
        setModMetadata(mod)
    }

    prestart() {
        registerOpts()
    }

    poststart() {
        addWidgets()
    }
}
