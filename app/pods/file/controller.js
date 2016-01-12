import Ember from 'ember';

export default Ember.Controller.extend({
	properties:[
	{
		name:"id",
		title:"Name"
	},
    {
		name:"path",
		title:"Preview",
		mayBeImage:true
    },
    {
		name:"size",
		title:"Size",
    }
  ],
});
