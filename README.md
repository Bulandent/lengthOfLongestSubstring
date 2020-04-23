本文是使用 `webpack` 打包一个公共基础包，并且发布到 `npm` 的教程。
本文打包的是一道算法题目：求无重复字符的最长子串

题目如下：
给定一个字符串，请你找出其中不含有重复字符的最长子串的长度。

示例 1:

```
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

示例 2:

```
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

示例 3:

```
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

题目来源：
`https://leetcode-cn.com/problems/longest-substring-without-repeating-characters`

下面开始一步步介绍：

1. 新建项目目录：`mkdir lengthOfLongestSubstring`
2. 进入目录：`cd lengthOfLongestSubstring`
3. 初始化 `package.json`: `npm init -y`
4. 安装依赖: `npm i webpack webpack-cli terser-webpack-plugin -D`
5. 新建 `src/index.js`，写一个函数实现该算法:
    
    ```
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
    ```
6. 配置 `webpack.config.js`

    ```
    const TerserPlugin = require('terser-webpack-plugin')

    module.exports = {
        entry: {
            'length-of-longest-substring': './src/index.js',
            'length-of-longest-substring.min': './src/index.js'
        },
        output: {
            filename: '[name].js',
            library: 'lengthOfLongestSubstring',
            libraryTarget: 'umd',
            libraryExport: 'default'
        },
        mode: 'none',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    include: /\.min\.js$/,
                }),
            ],
        },
    }
    ```
    
7. 根目录下新建 `index.js` 配置包入口文件，根据环境来加载公共库

    ```
    if (process.env.NODE_ENV === 'production') {
        module.exports = require('./dist/length-of-longest-substring.min.js')
    } else {
        module.exports = require('./dist/length-of-longest-substring.js')
    }
    ```

8. 配置 `package.json` 的 `description`、`scripts` 的 `build` 和 `republish` 钩子函数。

    ```
    {
      "name": "length-of-longest-substring",
      "version": "1.0.1",
      "description": "无重复字符的最长子串",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack",
        "prepublish": "webpack"
      },
      "keywords": [],
      "author": "ccp",
      "license": "ISC",
      "devDependencies": {
        "terser-webpack-plugin": "^2.3.5",
        "webpack": "^4.43.0",
        "webpack-cli": "^3.3.11"
      }
    }
    ```

9. 去 `https://www.npmjs.com/` 注册账号
10. 在终端登录`npm`: `npm login`
11. 发布包：`npm publish`
12. 如果包有做修改可以更新包，但是得先更新版本号，然后 `npm publish`；更新版本号，可以直接去 `package.json` 里手动修改 `version`, 也可以通过 `npm version [major | minor | patch]` 来更新 [主 | 次 | 补丁] 版本号。
    