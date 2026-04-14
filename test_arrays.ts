import { testOnce } from './test_run.ts';
import process from 'process';

const studentCode = `import java.util.*;

class Solution {
    int[] twoSum(int[] numbers, int target) {
        Arrays.sort(numbers);
        return new int[]{-1, -1};
    }
}`;

testOnce('two-sum-basic', studentCode).then(console.log).catch(console.error).finally(() => process.exit(0));
