module.exports = (api) => {
    api.cache(true);

    const presets = [
        [
            "@babel/preset-env", 
            {
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1",
                    "ie":"11"
                },
                "modules":false,
                "useBuiltIns": "usage",
                "corejs": { "version": 3 },
            }
        ]
    ];

    const plugins = [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-runtime",
    ];

    return {
        presets,
        plugins,
        comments: true
    };
};
