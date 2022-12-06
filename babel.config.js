module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@/images': './assets/images',
          '@/audio': './assets/audio',
          '@/firebase': './src/app/firebase',
          '@/redux': './src/app/redux',
          '@/components': './src/components',
          '@/navigator': './src/navigator',
          '@/screens': './src/screens',
          '@/util': './src/util',
          '@/models': './functions/src/models',
          '@/constants': './functions/src/constants',
        },
      },
    ],
  ],
}
