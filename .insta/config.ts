import {
  AndroidApp,
  AndroidLintTask,
  AndroidEmulator,
  AndroidJUnitTestsTask,
  AndroidBuildAPKTask,
  AndroidBuildAppBundleTask,
  AndroidAnalyzeAPKTask,
  AndroidSignAPKTask,
  AndroidPreviewTask,
} from "https://raw.githubusercontent.com/instaci/config/v0.0.1/src/index.ts";

const app = AndroidApp('Configure Android app', {
  path: 'app', // Set to the path in the repository.
});

const androidEmulator = AndroidEmulator({
  APILevel: 30,
  ABI: "x86_64",
});

const lintTask = AndroidLintTask('Lint Java and Kotlin', {
  app,
});

const testTask = AndroidJUnitTestsTask('JUnit tests on Android 30', {
  app,
  dependsOn: [ lintTask ],
  device: [ androidEmulator ],
});

const buildReleaseAPKTask = AndroidBuildAPKTask('Build Release APK', {
  app,
  dependsOn: [ testTask ],
  task: 'assembleRelease',
});

AndroidBuildAppBundleTask('Build Release App Bundle', {
  app,
  dependsOn: [ testTask ],
  task: 'bundleRelease',
});

AndroidAnalyzeAPKTask('Analyze APK', {
  app,
  dependsOn: [ buildReleaseAPKTask ],
});

AndroidSignAPKTask('Sign Release Artifact', {
  app,
  dependsOn: [ buildReleaseAPKTask ],
});

AndroidPreviewTask('Android 30', {
  app,
  dependsOn: [ buildReleaseAPKTask ],
  device: [ androidEmulator ],
});
