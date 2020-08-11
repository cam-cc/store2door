module.exports = function Cart(o) {
	this.items = o.items || {};
	this.t_qty = o.t_qty || 0;
	this.name = o.name;
	this.t_price = o.t_price || 0;

	this.add = function(item,id, name){
		var storedItem = this.items[id];
		if(!storedItem){
			storedItem = this.items[id] = {item: item, qty: 0, qty:0};
		};
		storedItem.name = item.name;
		storedItem.qty++;
		storedItem.price = storedItem.item.price * storedItem.qty;
		this.t_qty++;
		this.t_price += storedItem.item.price;
		this.name = item.name;
	};

	this.generateArray = function() {
		var arr = [];
		for (var id in this.items){
			arr.push(this.items[id]);
		}
		return arr;
	}
};