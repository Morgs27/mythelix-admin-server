export const promptMetaData = {
    alterChance : 0.1,
    extraString: ", photorealistic, game splash art, epic background"
}

export const promptWeights = [
    {
        prompt: 'dragon',
        probability: 1,
        alters: [
            {
                value: 'monochromatic',
                probability: 1,
                type: 'extra'
            },
            {
                value: 'pixel art',
                probability: 1,
                type: 'before',
            }
        ]
    },
    {
        prompt: 'unicorn',
        probability: 0.2,
        alters: [
            {
                value: 'monochromatic',
                probability: 1,
                type: 'extra',
            },
            {
                value: 'pixel art',
                probability: 1,
                type: 'before',
            }
        ]
    }
]

