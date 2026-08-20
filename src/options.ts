import type { Options } from 'ccmodmanager/types/mod-options'
import { modMetadata } from './mod-metadata'

export let Opts: ReturnType<typeof modmanager.registerAndGetModOptions<ReturnType<typeof registerOpts>>>

export function registerOpts() {
    const opts = {
        general: {
            settings: {
                title: 'General',
                tabIcon: 'general',
            },
            headers: {
                general: {
                    excludeUnplayableVainlla: {
                        type: 'CHECKBOX',
                        name: 'Exclude unplayable',
                        description: 'Exclude vanilla characters that have very little combat arts',
                        init: true,
                    },
                },
            },
        },
    } as const satisfies Options

    Opts = modmanager.registerAndGetModOptions(
        {
            modId: modMetadata.manifest.id,
            title: 'Char swap widgets',
        },
        opts
    )
    return opts
}
