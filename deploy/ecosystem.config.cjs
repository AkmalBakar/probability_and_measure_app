module.exports = {
  apps: [{
    name: 'ma411-study',
    script: 'server.cjs',
    cwd: '/var/www/ma411-study/app',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    instances: 1,
    autorestart: true,
    max_restarts: 10,
    watch: false,
    max_memory_restart: '200M',
  }],
};
