before(() => {
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
})

after(() => { console.error.restore() })