module.exports = {
  apps: [
    {
      name: 'vinashoptv_client_tinh',
      port: 3001,
      exec_mode: 'fork',
      instances: 1,
      script: './.output/server/index.mjs',
      env: {
        PORT: 3001
      }
    }
  ]
}
