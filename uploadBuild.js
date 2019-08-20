const ipfsAPI = require('ipfs-http-client');

const ipfs = new ipfsAPI({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
}); 

console.log("addFromFs")
ipfs.addFromFs('build', { recursive: true}).then((res) => {
  console.log("result: ", res)
}, (err)=> {
  console.error("error:" , err)
})
