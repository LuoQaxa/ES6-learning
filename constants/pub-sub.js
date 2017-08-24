// 发布-订阅：观察者模式，对象间的一对多的依赖关系。当一个对象的状态发生变化，所有依赖于它的对象都将得到通知。

// var salesOffices = {} //pub
// salesOffices.clientList = []; //缓存列表，花名册
// salesOffices.listen = function(fn) {
// 	this.clientList.push(fn)  //添加订阅者
// } 
// salesOffices.trigger = function() { //发布消息
// 	// 这种循环方式第一次见呢
// 	for(var i = 0; i<this.clientList.length; i++){
// 		this.clientList[i].apply(this,arguments)
// 	}
// 	// for (var i = 0,fn; fn = this.clientList[ i++];){
// 	// 	fn.apply(this,arguments) //arg发布时带上的参数
// 	// }
// }
// salesOffices.listen( function(price,squareMeter){ //小明
// 	console.log(price)
// 	console.log(squareMeter)
// })
// salesOffices.listen( function(price,squareMeter){ //小红
// 	console.log(price)
// 	console.log(squareMeter)
// })
// salesOffices.trigger(2000000,88);
// salesOffices.trigger(3000000,110);


// 如果小明只想接收88平米的房屋信息
// var salesOffices = {};
// salesOffices.clientList = {};
// salesOffices.listen = function(key,fn){
// 	if (!this.clientList[key]) {
// 		// 如果还没有此类消息，就给该类消息创建一个列表
// 		this.clientList[key] = [];
// 	}
// 	this.clientList[key].push(fn);
// }
// salesOffices.trigger = function(){
// 	// 根据key来遍历相应的缓存列表
// 	// 取出key参数
// 	var key = Array.prototype.shift.call(arguments);
// 	fns = this.clientList[key] //取出该消息对应的回调函数集合
// 	if (!fn && fns.length === 0) {
// 		return false
// 	}
// 	for (var i = 0,fn; fn = fns[ i++];){
// 		fn.apply(this,arguments) //arg发布时带上的参数
// 	}
// }
// salesOffices.listen( 'squareMeter88',function(price){ //小明
// 	console.log(price)
// })
// salesOffices.listen('squareMeter110',function(price){ //小红
// 	console.log(price)
// })
// salesOffices.trigger('squareMeter88',2000000);
// salesOffices.trigger('squareMeter110',3000000);

// 这样虽然实现了订阅不同类型的，但是不同的售楼处又要重写一次

var event = {
	clientList = [],
	listen:function(key, fn) {
		if (!this.clientList[key]) {
				// 如果还没有此类消息，就给该类消息创建一个列表
				this.clientList[key] = [];
			}
		this.clientList[key].push(fn);
	},
	trigger:function(){
		var key = Array.prototype.shift.call(arguments);
		fns = this.clientList[key] //取出该消息对应的回调函数集合
		if (!fn && fns.length === 0) {
			return false
		}
		for (var i = 0,fn; fn = fns[ i++];){
			fn.apply(this,arguments) //arg发布时带上的参数
		}
	}
}

var installEvent = function(obj) {
	for (var i in event) {
		obj[i] = event[i]
	}
}

var salesOffices = {}
installEvent(salesOffices)

salesOffices.listen( 'squareMeter88',function(price){ //小明
	console.log(price)
})
salesOffices.listen('squareMeter110',function(price){ //小红
	console.log(price)
})
salesOffices.trigger('squareMeter88',2000000);
salesOffices.trigger('squareMeter110',3000000);


// 添加取消订阅
