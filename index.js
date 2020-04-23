if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/length-of-longest-substring.min.js')
} else {
    module.exports = require('./dist/length-of-longest-substring.js')
}