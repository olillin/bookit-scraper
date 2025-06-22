type TranslationTable = { [_: string]: string }

function translationFunction(table: TranslationTable): (name: string) => string {
    return (name: string) => table[name] ?? name
}

/**
 * Get the Swedish name of a room in Hubben from its BookIT name
 * @param name The name of the room from BookIT
 * @returns The Swedish name of the room, or the same name if no translation is found
*/
export const translateRoom = translationFunction({
    'BIG_HUB': 'Storhubben',
    'GROUP_ROOM': 'Grupprummet',
    'CTC': 'CTC',
    'The Cloud': 'The Cloud',
})

/**
 * Get the pretty name of a group from BookIT
 * @param name The name of the group from BookIT
 * @returns The pretty name of the group, or the same name if no translation is found
*/
export const translateGroup = translationFunction({
    '8bit': '8-bIT',
    'alumnimiddag': 'Alumnimiddag',
    'armit': 'ArmIT',
    'cloudlords': 'Cloudlords',
    'dateit': 'DatE-IT',
    'digit': 'digIT',
    'drawit': 'DrawIT',
    'ejansvarsbefriad': 'Ej Ansvarsbefriad',
    'equalit': 'EqualIT',
    'fanbarerit': 'FanbärerIT',
    'fikit': 'FikIT',
    'flashit': 'FlashIT',
    'fritid': 'frITid',
    'helgit': 'HelgIT',
    'hookit': 'HookIT',
    'kaffeansvariga': 'Kaffeansvariga',
    'kandidatmiddagen': 'Kandidatmiddagen',
    'laggit': 'LaggIT',
    'motespresidit': 'MötespresidIT',
    'mrcit': 'MrKIT',
    'nollkit': 'NollKIT',
    'prit': 'P.R.I.T.',
    'rekryt': 'Rekryt',
    'revisorer': 'RevisIT',
    'sexit': 'sexIT',
    'samlag': 'Skol avslutnings musik ledar arbetsgruppen',
    'snit': 'snIT',
    'styrit': 'styrIT',
    'tradgardsmasterit': 'TrädgårdsmästerIT',
    'valberedningen': 'Valberedningen',
})