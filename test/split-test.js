import {expect} from 'chai'
import stream from 'most'
import split from '../src/split'

describe('split', function() {
  it('should split a stream of objects by field name', function (done) {
    let s = stream.from([{a:1,b:'a'}, {a:2,b:'b'}, {a:3, b:'c'}])

    let {a,b} = split(s, ['a', 'b'])
    
    let first = a.reduce((a,b)=>a+b, 0).then((result) => {
      expect(result).to.equal(6)
    })
    let second = b.reduce((a,b)=>a+b, '').then((result) => {
      expect(result).to.equal('abc')
    })

    Promise.all([first,second])
      .then(() => done())
      .catch(e => done(e))
  })

  it('should split a stream of arrays', function(done) {
    let s = stream.from([[1,'a'], [2,'b'], [3], [4,'c']])
    let [num, alph] = split(s)

    let first = num
        .reduce((a,b)=>a+b, 0).then((result) => {
      expect(result).to.equal(10)
    })
    let second = alph
        .reduce((a,b)=>a+b, '').then((result) => {
      expect(result).to.equal('abc')
    })

    Promise.all([first,second])
      .then(() => done())
      .catch(e => done(e))
  })
})
