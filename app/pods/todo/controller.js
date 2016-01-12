import Ember from 'ember';

export default Ember.Controller.extend({
	
	properties:[
		// {
		// 	name:"id",
		// 	title:"ID",
		// 	type:"text",
		// 	className:'max-width-id',
		// 	hidden:true,
		// 	filterColumn:true,
		// 	filter:false,
		// 	mayBeHidden:true,
		// 	orderColumn:true,
		// },
		{
			name:"text",
			title:"Text",
			type:"text",
			filterColumn:true,
			mayBeHidden:true,
			orderColumn:true,
		}
	],
	pagination:{
		default:10,
		range:[10,25,50]
	},
	initOrder:{
		key:"id",
		order:"desc"
	}
	
});
