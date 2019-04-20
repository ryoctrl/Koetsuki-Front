module.exports = {
  apps : [
      {
          name: "koetuki-f",
          script: "npm",
          args: "start",
          env: {
              PORT: 1504,
              REACT_APP_API_HOST: 'https://koetuki-back.mosin.jp/',
          }
      }
  ]
};
