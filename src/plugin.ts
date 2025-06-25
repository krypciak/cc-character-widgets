import { PluginClass } from 'ultimate-crosscode-typedefs/modloader/mod'
import type {} from 'nax-ccuilib/src/ui/quick-menu/quick-menu-extension'

export default class CharacterWidgets implements PluginClass {
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
