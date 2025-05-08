import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';

export default {

    input: 'src/CesiumNavigation.js',
    output:{
        name:"CesiumNavigation.umd",
        file:"dist/CesiumNavigation.umd.js",
        format: 'umd',
        sourcemap: true,
    },
    plugins: [
        resolve({
            browser: true,
        }),
        json(),
        postcss({
            extensions: ['.less'],
            extract: 'cesium-navigation.css', // ✅ 输出最终的 CSS 文件路径
            minimize: true,             // 可选：是否压缩 CSS
            use: [
              ['less', { javascriptEnabled: true }] // ✅ 编译 less
            ]
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
        }),
    ]
};
