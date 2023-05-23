module.exports = {
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/?(*.)+(test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}

