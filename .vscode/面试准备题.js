// 还有问题，obj 本身是一个其他的对象，比如说 arrary，还需要一个 length属性
// special objects: func, error, reg, Date
// const deepClone = obj => (
//     Object.keys(obj).reduce(
//         (acc, cur) => acc[key] = typeof acc[key] === 'object' ? deepClone(acc[key]) : acc[key],
//         Object.assign({}, obj),
//     )
// )

// const curry = (fn, ...args) => args.length < fn.length
//     ? (...newArgs) => curry(fn, ...args.concat(newArgs))
//     : fn(args);

// 这么写是会
// 为什么它的属性会是 enumrable
// Array.prototype.min = function() {
//     console.log('heheh');
// }

// var a = [1,2,33,66];

// for (var key in a) {
//     // parseInt 在什么情况下会返回一个 NaN?
//     console.log('item', a[key], parseInt(a[key], 10));
// }

const res = /.+\.css($|\?)/.test('www.baidu.com/asserts/hhaah.cssp?test=true');
console.log(res);
