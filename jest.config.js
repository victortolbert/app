module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
    '@nuxtjs/composition-api': '@nuxtjs/composition-api/lib/entrypoint.js',
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/cypress/e2e/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue-tjw'],
  setupFilesAfterEnv: ['./jest.setup.js'],
}
