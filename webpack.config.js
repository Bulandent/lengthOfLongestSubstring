const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: {
        'length-of-longest-substring': './src/index.js',
        'length-of-longest-substring.min': './src/index.js'
    },
    output: {
        filename: '[name].js',
        library: 'lengthOfLongestSubstring',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    mode: 'none',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
            }),
        ],
    },
}