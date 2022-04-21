module.exports = {
    plugins: ['prettier'],
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['plugin:prettier/recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'prettier/prettier': 'error',
    },
};
