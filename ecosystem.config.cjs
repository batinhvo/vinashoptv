module.exports = {
  apps: [
    {
      name: 'vinashoptv_client_tinh',
      // port: 9000,
      exec_mode: 'fork',
      instances: 1,
      script: './.output/server/index.mjs'
    }
  ]
}
