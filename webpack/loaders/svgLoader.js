export const svgLoader = {
    test: /\.svg$/i,
    oneOf: [
        {
            dependency: { not: ['url'] },
            use: [
            {
                loader: '@svgr/webpack',
                options: {
                titleProp: true,
                svgo: true,
                },
            },
            'new-url-loader',
            ],
        },
        {
            type: 'asset/resource',
            generator: {
            filename: 'static/[name].[contenthash][ext][query]',
            },
            parser: {
            dataUrlCondition: 4 * 1024,
            },
        },
    ],
}