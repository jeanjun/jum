import { jum } from '@jeanjun/jum'

const jumer = jum(document.getElementById('jum')!, {
  minScale: 0.5,
  maxScale: 4,
  scale: 1
})

console.log(jumer)