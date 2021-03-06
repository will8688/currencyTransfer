module.exports = {
    entry: ["./initializer.js"],
    output: {
        path: __dirname,
        filename: "public/script.bundle.js"
    },
    watch: true,
    module: {
        loaders: [
          {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
          }
        ]
      }
};