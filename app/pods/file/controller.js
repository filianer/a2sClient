import Ember from 'ember';

export default Ember.Controller.extend({
	pathDownload: null,
	properties:[
	{
		name:"id",
		title:"Name"
	},
    {
		name:"path",
		title:"Preview",
		mayBeMedia:true,
    },
    {
		name:"size",
		title:"Size",
    }
  ],
});
