module.exports = {
  reactStrictMode: true,
  // basePath: '<NGINX_INGRESS_PATH>', // uncomment this if want to deploy in kubernetes
  env: {
    API_DOMAIN: "<API_DOMAIN>", // ex: http://192.168.0.1
    IMAGE_URL: "<IMAGE_URL_S3_BUCKET>",
  },
}

