#### for循环的问题
for循环性能高，但是写起来麻烦，并且如果有多层嵌套循环，需要自己去控制多个变量，很容易出错。迭代器就可以解决这个问题

#### 迭代器iterator
迭代器只是带有特殊方法的**对象**，所有iterator都有next()方法并返回一个包含两个属性(value,done)的结果对象。value代表下一个位置的值，done在没有更多值可供
迭代的时候为true。迭代器带有一个内部指针，来指向集合中某个值的位置，当next()方法调用后，指针下一位置的值会被返回。
```
function createIterator(items) {
	var i = 0
	next: function() {
		var done = (i > items.length)
		var value = !done ? items[i++] : undefined
		return {
			value: value,
			done: done
		}
	}
}
```
#### 生成器函数
生成器函数就是返回迭代器的函数
```
function * createIterator() {
	// yield 后面的值表示我们迭代到的值
	yield 3
	yield 4
	yield 2
}
var it = createIterator()
```
生成器函数与普通函数的区别是，它被调用后，返回的是一个迭代器对象，而这个迭代器对象有next方法，每调用一次迭代器的next方法，如果碰到yield都会返回一个迭代到的
对象，然后停止继续执行，直到下次调用next方法。
**注意**： yield关键字只能直接用在生成器内部

#### 可迭代类型和for-of迭代循环

