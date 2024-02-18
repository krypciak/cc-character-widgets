import { PluginClass } from 'ultimate-crosscode-typedefs/modloader/mod'
import { Mod1 } from './types'

import 'nax-ccuilib/src/headers/nax/quick-menu-public-api.d.ts'

export default class CharacterWidgets implements PluginClass {
    static dir: string
    static mod: Mod1

    constructor(mod: Mod1) {
        CharacterWidgets.dir = mod.baseDirectory
        CharacterWidgets.mod = mod
        CharacterWidgets.mod.isCCL3 = mod.findAllAssets ? true : false
        CharacterWidgets.mod.isCCModPacked = mod.baseDirectory.endsWith('.ccmod/')
    }

    async poststart() {
        /* character swap */
        function getPlayerHeadConfig(playerName: string): nax.ccuilib.QuickMenuWidgetImageConfig {
            return () => {
                const headIdx = sc.party.models[playerName].getHeadIdx()
                return {
                    gfx: new ig.Image('media/gui/severed-heads.png'),
                    pos: { x: 4, y: 1 },
                    srcPos: { x: headIdx * 24, y: 0 },
                    size: { x: 24, y: 24 },
                }
            }
        }
        for (let i = 0; i < sc.PARTY_OPTIONS.length; i++) {
            const playerName = sc.PARTY_OPTIONS[i]
            const image = getPlayerHeadConfig(playerName)
            nax.ccuilib.QuickRingMenuWidgets.addWidget({
                title: playerName,
                name: `chararacter_${playerName}`,
                description: `Click to play as ${playerName}`,
                image,
                pressEvent: () => {
                    const config = sc.party.models[playerName].config
                    sc.model.player.setConfig(config)
                    ig.ENTITY.Combatant.prototype.update.call(ig.game.playerEntity)
                },
            })
        }
    }
}
