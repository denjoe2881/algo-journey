import fs from 'fs';
import { javaRun } from './src/runner/java-runner.ts';
import exercise from './src/content/problems/arrays/two-sum-sorted.exercise.ts';
import process from 'process';

const studentCode = fs.readFileSync('src/content/problems/arrays/two-sum-sorted.solution.java', 'utf8');

javaRun(exercise, studentCode, true).then(res => {
    console.log(JSON.stringify(res, null, 2));
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
