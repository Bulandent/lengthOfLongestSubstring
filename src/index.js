export default function lengthOfLongestSubstring (s) {
    const size = s.length
    if (!size) return s
    const subStrSet = new Set() // 存储窗口的元素，用于快速判重
    let i = 0 // 滑动窗口左边界
    let j = 0 // 滑动窗口右边界
    let len = 0 // 最长子串长度

    // 遍历字符串、移动窗口
    while (i < size && j < size) {
        if (!subStrSet.has(s[j])) {
            // 当字符没有存在set，则push进去
            // 同时需要移动滑动窗口右边界、更新最长子串长度
            subStrSet.add(s[j++])
            len = Math.max(len, j - i) // 这里取len与j-i最大，其实就是利用len缓存之前出现过的最大值
        } else {
            // 如果已存在，出现重复字符
            // 从set删除重复字符前面的字符串，移动滑动窗口左边界
            // 这里j不变也是一个关键，下次还是扫描到重复元素s[j]
            subStrSet.delete(s[i++])
        }
    }
    return len
}