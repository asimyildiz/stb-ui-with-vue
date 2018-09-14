module.exports = {
    lintOnSave: true,
    configureWebpack: {
        output: {
            devtoolModuleFilenameTemplate: '[absolute-resource-path]',
            devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
        },
        devtool: process.env.NODE_ENV === 'test' ? '#eval' : '#source-map'
    }
};
