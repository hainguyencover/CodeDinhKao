function minSkillDifference(n, skills) {
    if (n < 1 || n > 16) {
        throw new Error("Số lượng học sinh phải từ 1 đến 16");
    }

    const totalSum = skills.reduce((a, b) => a + b, 0);
    let minDiff = Infinity;

    const totalCombinations = 1 << n; // 2^n

    for (let mask = 1; mask < totalCombinations - 1; mask++) {
        let groupSum = 0;

        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                groupSum += skills[i];
            }
        }

        const diff = Math.abs(totalSum - 2 * groupSum);
        minDiff = Math.min(minDiff, diff);
    }

    return minDiff;
}

console.log("Do chenh lech: " + minSkillDifference(5, [1, 2, 3, 4, 50]));

function pickUpTreasure(n, T, times, points) {
    // Tạo mảng dp
    const dp = Array.from({ length: n + 1 }, () => Array(T + 1).fill(0));

    // Quy hoạch động
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= T; j++) {
            if (times[i - 1] <= j) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - times[i - 1]] + points[i - 1]);
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    // Truy vết để tìm kho báu đã chọn
    let res = [];
    let i = n, j = T;
    while (i > 0 && j >= 0) {
        if (dp[i][j] !== dp[i - 1][j]) {
            res.push(i); // lưu chỉ số kho báu (bắt đầu từ 1)
            j -= times[i - 1];
        }
        i--;
    }

    res.reverse(); // đảo ngược để in theo thứ tự tăng dần
    console.log("Tổng điểm lớn nhất:", dp[n][T]);
    console.log("Các kho báu được chọn (theo chỉ số bắt đầu từ 1):", res.join(''));
}

// Ví dụ
const n = 6;
const T = 10;
const times = [4,2,6, 3, 5, 1];
const points = [8,3,7,6,4,2];

pickUpTreasure(n, T, times, points);

