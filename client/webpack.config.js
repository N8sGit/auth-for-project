var path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const isDev = process.env.NODE_ENV === 'development'


module.exports = {
    entry: './src/index.js',
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    devtool: 'source-map',
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    // When we're in development, we can use this handy live-reload plugin
    // to refresh the page for us every time we make a change to our client-side
    // files. It's like `nodemon` for the front end!
    plugins: isDev ? [new LiveReloadPlugin({appendScriptTag: true})] : []

  }
