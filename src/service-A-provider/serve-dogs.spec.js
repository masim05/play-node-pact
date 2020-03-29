const { Verifier } = require("@pact-foundation/pact")
const path = require("path")

const { server } = require('./server')

describe('Pact Verification', () => {
  const port = 1234
  const providerName = 'MyProvider'
  let srv;
  const opts = {
    provider: providerName,
    providerBaseUrl: `http://localhost:${port}`,
    pactUrls: [path.resolve(process.cwd(), "../../pacts", "myconsumer-myprovider.json")],
    log: path.resolve(process.cwd(), "../../logs", "mockclient-integration.log"),
    spec: 2,
    consumer: "MyConsumer",
    pactfileWriteMode: "merge",
  }

  before(async () => {
    srv = server.listen(port, () => {
      console.log(`Provider service listening on http://localhost:${port}`)
    })
  })

  after(async () => {
    srv.close()
  })

  it('should validate the expectations of Order Web', () => {
    return new Verifier().verifyProvider(opts)
  })
})
