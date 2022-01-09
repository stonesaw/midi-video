const { Midi } = require("@tonejs/midi");

export function loadMidi(url) {
    Midi.fromUrl(url).then(midi => {
        return {
            name: midi.name,
            tracks: midi.tracks
        }
    })
}

