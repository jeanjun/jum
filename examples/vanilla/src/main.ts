import { jum } from '@jeanjun/jum'

const jumer = jum(document.getElementById('jum')!, {
  onZoomStart: () => {
    // console.log('onZoomStart')
  },
  onZoomUpdate: ({ camera }) => {
    // console.log('onZoomUpdate', camera)
  },
  onZoomEnd: () => {
    // console.log('onZoomEnd')
  }
})

console.log(jumer)