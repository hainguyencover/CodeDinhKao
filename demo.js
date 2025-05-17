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
    const dynamicProgramming  = Array.from({ length: n + 1 }, () => Array(T + 1).fill(0));

    // Quy hoạch động
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= T; j++) {
            if (times[i - 1] <= j) {
                dynamicProgramming[i][j] = Math.max(dynamicProgramming[i - 1][j], dynamicProgramming[i - 1][j - times[i - 1]] + points[i - 1]);
            } else {
                dynamicProgramming[i][j] = dynamicProgramming[i - 1][j];
            }
        }
    }

    // Truy vết để tìm kho báu đã chọn
    let res = [];
    let i = n, j = T;
    while (i > 0 && j >= 0) {
        if (dynamicProgramming[i][j] !== dynamicProgramming[i - 1][j]) {
            res.push(i); // lưu chỉ số kho báu (bắt đầu từ 1)
            j -= times[i - 1];
        }
        i--;
    }

    res.reverse(); // đảo ngược để in theo thứ tự tăng dần
    console.log("Tổng điểm lớn nhất:", dynamicProgramming[n][T]);
    console.log("Các kho báu được chọn (theo chỉ số bắt đầu từ 1):", res.join(''));
}

// Ví dụ
const n = 5;
const T = 7;
const times = [1, 2, 3, 4, 5];
const points = [3, 1, 4, 5, 6];

pickUpTreasure(n, T, times, points);

