module.exports = {
  apps: [
    {
      name: 'vinashoptv_client_tinh',
      exec_mode: 'fork',
      instances: 1,
      script: './.output/server/index.mjs',
      env: {
        PORT: 3002,
        HOST: '0.0.0.0',
        NODE_ENV: 'production'
      },
      env_production: {
        PORT: 3002,
        HOST: '0.0.0.0',
        NODE_ENV: 'production'
      },
      // PM2 specific configurations for production
      max_memory_restart: '1G',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      // Auto restart if app crashes
      autorestart: true,
      // Don't restart if app exits cleanly
      restart_delay: 4000
    }
  ]
}
