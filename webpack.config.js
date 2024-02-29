const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const PugPlugin = require('pug-plugin');

module.exports = {
   mode: 'development',
   
   //'./src/index.ts',
   devtool:"source-map",
   entry:["./src/sass/base.scss", "./src/index.ts"],
   //'inline-source-map',
   performance: {
      hints: false,
      maxEntrypointSize: 1000000,
      maxAssetSize: 1000000
   },

   devServer: {
      port: 9002,
      compress: true,
      hot: true,
      static: {
         directory: path.join(__dirname, 'dist')
      }
   },

   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.pug$/,
            loader: PugPlugin.loader,
            options: {
               pretty: true
            }
         },
         {
            test: /\.(sass|scss)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
            
         },
         {
            test: /\.(png|svg|jpg|jpeg)$/i,
            type: 'asset/resource'
         },
         {
            test: /\.html$/,
            use: ["html-loader"],
         },
         {
            test: /\.json$/,
            loader: 'json-loader'
         }

      ],
   },
   resolve: {
      extensions: ['.tsx', '.ts', '', '.js', '.jsx', '.scss'],
      modules: [
         'node_modules'
       ]
     // extensions: ['.tsx', '.ts', '.js'],
    
   },
   output: {
      filename: 'script.js',
      path: path.resolve(__dirname, 'dist'),
   },
   plugins: [
      new htmlWebpackPlugin({
         title: 'Book Shop',
         template: './src/index.html'

      }),
      new PugPlugin(),

      new CopyWebpackPlugin({
         patterns: [
            { from: 'src/assets/jpg', to: 'jpg' },
            { from: 'src/assets/png', to: 'png' },
           // { from: 'src/sass', to: 'sass' },
            
         ]
      })
   ]

};
