import Ember from 'ember';

export default Ember.Controller.extend({
	selectServices:['local', 'gcloud'],
	service: null,

	changeService: Ember.observer('service', function(){
		console.log("Cambia service");
		this.store.adapterFor('container').set('service',this.get('service'));
		this.store.adapterFor('file').set('service',this.get('service'));
		this.send('refreshRoute');
	}),

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
