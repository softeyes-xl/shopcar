var shopThing = require('../../../utils/shopThing.js');
var index = require('../../../utils/inedx.js');
var list = require('../../../utils/list.js');
var order = require('../../../utils/order.js');
/*
	图片
	是否有货
	名字
	价格
	详情
	参数
*/
Page({
	data:{
		currentTab: 0,
		// array: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,20],
		index: 0,
		num: 1,
		cartNum: 0,
		ifadd: false,
		detail: '',
		eIndex: 0,
		putcart: false,
		buycart: false
	},
	getTime: function () {
	  var timeNumber = 0;
	  var dates = new Date();
	  var year = dates.getFullYear() + '';
	  var month = dates.getMonth() + 1 + '';
	  var date = dates.getDate() + '';
	  var minute = dates.getMinutes() + '';
	  var second = dates.getSeconds() + '';
	  var time = dates.getTime() % 6 + '';
	  time = parseInt(Math.random() * time);

	  if(month.length < 2) {
	    month = '0' + month
	  }

	  if(minute.length < 2) {
	    minute = '0' + minute
	  }

	  if(second.length < 2) {
	    second = '0' + second
	  }

	  return timeNumber = year + month + date + minute + second + minute + second + time;
	},
	bindChange: function(e) {
		var that = this;
		this.setData({
			currentTab: e.detail.current
		})
	},
	swichNav: function(e) {  	
	  var that = this;  	
	  if( this.data.currentTab === e.target.dataset.current ) {  
	    return false;  
	  } else {  
	    that.setData( {  
	      currentTab: e.target.dataset.current,
	    })  
	  }  
	},
	changeNum: function(e) {
		console.log(e);
		this.setData({
			index: e.detail.value,
			num: this.data.array[e.detail.value]
		})
	},
	toshopcar: function() {
		wx.switchTab({
      		url:"../../shopcar/shopcar"
     	});
	},
	subnum: function() {
		if(this.data.num <= 1) {
			this.setData({
				num: 1
			})
		}else {
			this.setData({
				num: this.data.num-1
			})
		}
	},
	addnum: function() {
		if(this.data.num >= 99) {
			this.setData({
				num: 99
			})
		}else {
			this.setData({
				num: this.data.num+1
			})
		}
	},
	changeput: function() {
		this.setData({
			putcart: true
		})
	},
	hidemask: function() {
		this.setData({
			putcart: false
		})
	},
	hidemask1: function() {
		this.setData({
			buycart: false
		})
	},
	gobuy: function() {
		this.setData({
			buycart: true
		})
	},
	tocart: function() {
		console.log()
		var that = this;
		var obj = {
			"thingName": this.data.detail.thingName,
			"thingImg": this.data.detail.thingImg,
			"thingPrice": this.data.detail.thingPrice,
			"thingNum": this.data.num,
			"thingId": this.data.detail.thingId,
			"choose": true
		}
		var timer = null;
		var num = 0;
		for(var k=0; k<shopThing.shopThing.length; k++) {
			num += shopThing.shopThing[k].thingNum;
		}
		
		this.setData({
			cartNum: num,
			putcart: false
		})	
		for(var i=0; i<shopThing.shopThing.length; i++) {
			if(shopThing.shopThing[i].thingName === obj.thingName) {
				if(this.data.num === 1) {
					shopThing.shopThing[i].thingNum += 1;
					num += 1
				}else {
					shopThing.shopThing[i].thingNum += this.data.num;
					num += this.data.num
				}				
				this.setData({
					cartNum: num
				})
				return;
			}
		}	
		shopThing.shopThing.push(obj);	
		num = 0;
		for(var j=0; j<shopThing.shopThing.length; j++) {
			num += shopThing.shopThing[j].thingNum;
		}
		this.setData({
			cartNum: num
		})	
	},
	toorder: function() {
		var obj = {
		  thingNumber: this.getTime(),
		  thingName: this.data.detail.thingName,
		  thingImg: this.data.detail.thingImg,
		  thingPrice: this.data.detail.thingPrice,
		  thingNum: this.data.num,
		  thingId: this.data.detail.thingId,
		  thingPay: '待付款'
		}
		order.order.push(obj);

		wx.navigateTo({
		  url: '../../buy/buy'
		}) 
	},
	onLoad:function(options){
		var arr = options.index.split(',');
		for(var i=0; i<arr.length; i++) {
			arr[i] = Number(arr[i]);
		}
		console.log(arr);
		if(options.index.length > 1) {
			this.setData({
				detail: list.list[arr[0]][arr[1]]
			})

			var num = 0;
			for(var i=0; i<shopThing.shopThing.length; i++) {
				num += shopThing.shopThing[i].thingNum;
			}

			this.setData({
				cartNum: num
			})	
		}else {
			this.setData({
				detail: index.index[arr[0]],
				eIndex: options.index
			})
			var num = 0;
			for(var i=0; i<shopThing.shopThing.length; i++) {
				num += shopThing.shopThing[i].thingNum;
			}
			this.setData({
				cartNum: num
			})	
		}
	},
	onReady:function(){
		
	},
	onShow:function(){
		
	},
	onHide:function(){
		
	},
	onUnload:function(){
		
	},
	onPullDownRefresh:function(){
		
	},
	onReachBottom:function(){
		
	}
})		