// Add `jest-vue-preprocessor` to your dev dependencies

module.exports = function (wallaby) {
  return {
    files: ['src/**/*', 'package.json'],

    tests: ['test/**/*.spec.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
      '**/*.vue': require('wallaby-vue-compiler')(wallaby.compilers.babel({}))
    },

    preprocessors: {
      '**/*.vue': file => require('jest-vue-preprocessor').process(file.content, file.path)
    },

    setup: function (wallaby) {
      const jestConfig = require('./package.json').jest || {}

      jestConfig.moduleNameMapper = {
        '^@/components/([^\\.]*)$': wallaby.projectCacheDir + '/src/components/$1.vue',
        '^@/(.*)$': wallaby.projectCacheDir + '/src/$1'
      }
      delete jestConfig.transform['\\.vue$']

      wallaby.testFramework.configure(jestConfig)
    },

    testFramework: 'jest',
    debug: true
  }
}
