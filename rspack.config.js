/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: "./src/main.tsx",
  },
  builtins: {
    html: [
      {
        template: "./index.html",
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
    ],
  },
  devServer: {
    open: false,
    historyApiFallback: true,
    host: "localhost", // 修改为你的开发服务器地址
    port: 8888,
    hot: true,
    allowedHosts: "all",
    client: {
      overlay: false,
    },
  },
};
