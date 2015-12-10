import stream from 'most'

// Split stream of collections into a collection of streams

export default function split(stream, fields=2) {
  let s = stream.multicast()
  let streams = []

  // Split an array by index
  if (typeof fields == 'number') {
    for (var i=0; i<fields; i++) {
      let j = i //use j to prevent closing over changing value i
      streams.push(
        s.filter(l => l.length > j)
         .map(o => o[j]))
    }
  } else { // Split an object by key
    streams = {}
    fields.forEach(f => {
      streams[f] = s.map(o => o[f])
    })
  }
  return streams
}
