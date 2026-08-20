import { Opts } from './options'

function getCombatArtCount(config: sc.PlayerConfig) {
    const arts = Object.values(config.elementConfigs).flatMap(c => Object.entries(c.actions))
    return arts.length
}

const vanillaCharactersCombatArtCount: Record<string, number> = {
    // Lea: 92,
    Emilie: 26,
    Apollo: 21,
    Shizuka: 16,
    Glasses: 16,
    Joern: 15,
    Schneider: 12,
    Schneider2: 12,
    Luke: 12,
    Shizuka0: 3,
    Hlin: 3,
    Grumpy: 3,
    Buggy: 3,
    Sergey: 0,
    Triblader1: 0,
}

function shouldIncludeCharacter(config: sc.PlayerConfig): boolean {
    if (!Opts.excludeUnplayableVainlla) return true

    if (vanillaCharactersCombatArtCount[config.name] === undefined) return true
    const artCount = getCombatArtCount(config)
    const vanillaArtCount = vanillaCharactersCombatArtCount[config.name]
    return artCount != vanillaArtCount
}

export function addWidgets() {
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

    const modelNames = Object.values(sc.party.models)
        .filter(m => shouldIncludeCharacter(m.config))
        .sort((a, b) => {
            let aci = sc.PLAYER_CLASSES[a.clazz] ?? 10
            let bci = sc.PLAYER_CLASSES[b.clazz] ?? 10

            if (aci !== bci) {
                return aci - bci
            } else {
                return a.name.localeCompare(b.name)
            }
        })

    for (const model of modelNames) {
        const image = getPlayerHeadConfig(model.name)

        nax.ccuilib.QuickRingMenuWidgets.addWidget({
            title: model.name,
            name: `chararacter_${model.name}`,
            description: `Click to play as ${model.name}`,
            image,
            pressEvent: () => {
                /* get fresh model just to be safe */
                const config = sc.party.models[model.name].config
                sc.model.player.setConfig(config)
                ig.ENTITY.Combatant.prototype.update.call(ig.game.playerEntity)
            },
        })
    }
}
