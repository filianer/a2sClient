import Ember from 'ember';

export default Ember.Controller.extend({
	properties:[
	{
		name:"id",
		title:"Name",
		template:'components/link-to-container'
	},
    {
		name:"size",
		title:"Size",
		hiddeCreate: true,
    }
  ],
});
