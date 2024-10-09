const path = require('path');
const { ProvidePlugin } = require('webpack');

module.exports = {
    entry: './src/index.js',
    optimization: {
        minimize: true,
    },
    output: {
        filename: 'ionweb.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'umd',
            name: {
                root: 'IonWeb',
                amd: 'ionweb',
                commonjs: 'ionweb',
            },
        },
    },
    resolve: {
        fallback: {
            buffer: require.resolve('buffer/'),
        },
    },
    plugins: [
        new ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
};