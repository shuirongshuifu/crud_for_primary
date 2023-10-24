// var regex = /hello/;
// console.log( regex.test("hello") ); // true

const reg = /fixed: true/g;
module.exports = function (source) {
    // console.log( typeof source );
    // 匹配fixed: true，并做一个替换
    source = source.replace(reg, "")
    console.log('替换后', source);
    return source;
}