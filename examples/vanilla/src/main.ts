import { jum } from 'jum-core'

const jumer = jum(document.querySelector('img')!, {
  onZoomStart: () => {
    // console.log('onZoomStart')
  },
  onZoomUpdate: ({ camera }) => {
    // console.log('onZoomUpdate', camera)
  },
  onZoomEnd: () => {
    // console.log('onZoomEnd')
  },
  scale: 1
})

console.log(jumer)