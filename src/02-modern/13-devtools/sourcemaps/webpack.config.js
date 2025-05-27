// Webpack configuration for source maps
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    
    optimization: {
        moduleIds: 'named',  // Keep module names in development
        chunkIds: 'named',   // Keep chunk names in development
    },
    
    output: {
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]'
    }
};
