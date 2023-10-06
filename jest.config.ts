/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  projects: [
    {
      setupFiles: ["./__tests__/setupEnvs.ts"],
      setupFilesAfterEnv: ["./__tests__/global.ts"],
    },
  ],
};
