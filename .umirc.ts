import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  publicPath: './',
  history: 'hash',
  hash: true, //添加hash后缀
  exportStatic: false,
  targets: {
    ie: 10,
    chrome: 47,
    firefox: 40,
    ios: 7,
    android: 4,
  },
  cssnano: {
    mergeRules: false,
  },
  autoprefixer: { flexbox: true },
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [{ path: '/', component: '../pages/index' }],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: false,
        title: 'JSONViewer',
        dll: false,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};

export default config;
