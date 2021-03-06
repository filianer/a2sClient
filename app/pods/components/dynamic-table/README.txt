Llamada:
{{table-simple modelo=model properties=properties actionDel="delete" actionNew="new" route-edit="contact.detail"}}

- model: datos del modelo para pintar en la tabla

- properties:[
	{
		name: 		nombre del campo en el modelo
		title:		nombre del campo para mostrar en la tabla
		type:		tipo de dato (quizás no haga falta cuando se quiten los edit text)
		hidden:		booleano, true si no queremos mostrar el campo y false o no se manda si queremos mostrarlo
		mayBeHidden: booleano, true si puede estar oculta
		filter:		booleano, false si no queremos filtrar por ese campo y true o no se manda si queremos filtrar,
		className:  nombre de la clase para las celdas de esa propiedad (Opcional, si no se pintan centradas),
		orderColumn: booleano para mostrar flechas de ordenación en las columnas, true para que se muestren, también habrá que 					pasar el valor useFilteringByColumns:true en el template de la tabla
		filterColumn: booleano para que aparezca el filtro por columnas, true para que aparezca
		template: 	url al template customizado (1),
		hiddeCreate: booleano, true para ocultar cuando se crea un nuevo elemento
	}
]

****** (1) Manejo de templates ******
	Ej:
	properties:[
	{
		name:"video_src",
		title:"Video",
		type:"text",
		mayBeHidden:true,
		template:'components/video-table'
	}
	Nos crearemos un componente de nombre video-table
	En el template podremos acceder a las propiedades del objeto mediante la palabra "doc"
	Ej template:
		<div align="center" class="embed-responsive embed-responsive-16by9">
		    <iframe width="560" height="315" src={{doc.video_src}} frameborder="0" allowfullscreen></iframe>
		</div>
		{{#if doc.video_description}}
			<div>{{doc.video_description}}</div>
		{{/if}}
	*Hay que tener presente que también tenemos que adaptar la vista del detalle para poder editarlo
****** Fin manejo templates *********

- editInline: booleano, true para editar elementos en línea dentro de la table o false o no se pasa para editarlos con modal
- createInline: booleano, true para crear nuevos elementos en línea dentro de la tabla o false o no se pasa para crearlos fuera 

- pagination:{
	default: 10, 			//valor predeterminado para paginación, si no se pasa por defecto coge 10
	range:[5,10,25,50]		//valor del rango para cambiar paginación, si no se pasa por defecto es 10,25,50
}

- initOrder:{ 		//ordenamiento inicial por algún campo, si no se pasa se ordena por id o por el primer campo
	key:"firstName",
	order:"asc" 	//asc o desc
}

- tableStriped: booleano, true para mostrar la tabla con colores alternos

- tableBordered: booleano, true para mostrar la tabla con bordes

- tableCondensed: booleano, true para mostrar la tabla condensada

- showTableFooter: booleano, true o no se pasa para mostrar el footer, false para no mostrarlo

- showTableHeader: booleano, true o no se pasa para mostrar el header, false para no mostrarlo

- showActionNew: booleano, true para poder añadir elemenots y false o no se pasa para no  poder añadir

-classResponsive: nombre de la clase para ocultar columnas cuando el dispositivo es pequeño

- useFilteringByColumns: booleano, true para añadir filtrado por columnas y false o no se pasa para no añadirlo,
ahora mismo todas las columnas visibles usan este filtro, si se desea controlar podríamos añadir otra propiedad a properties

- showColumnsFilter: booleano, true para añadir botón para mostrar/ocultar columnas, Ojo con añadir este elemento si se usa la edición en línea (editInline) porque puede causar problemas visuales

- showGlobalFilter: boobleano, true si queremos mostrar el filtro global y false o no se pasa si no queremos mostrarlo

- filteringIgnoreCase: booleano, true si queremos que ingnore mayúsculas o false o no se pasa si no

- actionDel: acción que se llamará para borrar las entradas de la tabla (Opcional, si no se pasa no se pinta el botón de borrado)

- actionNew: acción llamada para crear nuevas entradas en la tabla (Opcional, si no se pasa  no se permite añadir nuevos campos)

- customMessages = { //Mensajes customizados para la tabla
	'new-element':'New Element',					//Texto del botón para añadir nuevo elemento
	'searchLabel': 'Search',						//Texto placeholder del input para filtrar global
	'searchLabelColumn': 'Search',					//Texto placeholder del input para filtrar columnas
	'columns-title': 'Columns', 					//Texto del botón para seleccionar columnas visibles
	'columns-showAll': 'Show All', 					//Texto para mostrar todas las columnas
	'columns-hideAll': 'Hide All', 					//Texto para ocultar todas las columnas
	'columns-restoreDefaults': 'Restore Defaults', 	//Texto para restaurar la visibilidad de las columnas por defecto
	'tableSummary': 'Show %@ - %@ of %@',			//Texto para el summary en formato para usar  Ember.String.loc
	'allColumnsAreHidden': 'All columns are hidden. Use <strong>columns</strong>-dropdown to show some of them', 
													//texto para mostrar cuando no se ve ninguna columna
	'noDataToShow': 'No records to show', 			//Texto para mostrar cuando no hay resultados
	confirmDelete: 'Are you sure to delete it?',	//Texto para confirmar borrado de elementos
	confirmEmptySave: 'Element Empty, are you sure to save it?', //Texto para confirmar guardado de elemento vacío
};

*******************EDITAR*******************
- route-edit: nombre de la ruta donde se editarán las entradas (Opcional, si no se pasa no se pinta el botón edit)
	* Para editar los campos en el template que tengamos en route-edit podemos llamar al componente table-simple/table-detail
		{{table-simple/table-detail model=model actionDel="delete" actionUp="update" title="Edición" transition="transition"}}
		- model: modelo para la acción
		- actionDel: Acción para borrar elemento (Opcional, si no se pasa no se mete el botón delete) 
		- actionUp: Acción para actualizar elemento (Opcional, si no se pasa no se pinta el botón save)
		- title: titulo del modal (Opcional, si no se pasa se pone por defecto "Edit")
		- msgSave: texto botón guardar (Opcional, defecto "Save")
		- msgDelete: texto botón borrar (Opcional, defecto "Delete")
		- msgCancel: texto botón cancelar (Opcional, defecto "Cancel")
		- transition: si queremos que cuando se cancele el model vuelva a la ruta del padre deberemos definir en el route una acción para que vaya a la ruta que queramos ej:
			transition:function(){
				this.transitionTo('contact');
			}

		habrá que usarlo como un bloque y pasar dentro todos los campos de nuestro modelo, ej:
		{{#table-simple/table-detail model=model actionDel="delete" actionUp="update" title="Edición"}}
			<div>{{input type="text" value=model.firstName placeholder="first name"}}</div>
			<div>{{input type="text" value=model.lastName placeholder="last name"}}</div>
			<div>{{input type="number" value=model.age placeholder="age"}}</div>
		{{/table-simple/table-detail}}

		*Será obligatorio pasar la propiedad id para poder editar

	* IMPORTANTE: si usamos editInline = true habrá que usar el componente table-simple/table-detail-inline
		{{#table-simple/table-detail-inline model=model actionUp="update" transition="transition"}}
			<td class="text-center">{{input type="text" value=model.firstName placeholder="first name"}}</td>
			<td class="text-center">{{input type="text" value=model.lastName placeholder="last name"}}</td>
			<td class="text-center">{{input type="number" value=model.age placeholder="age"}}</td>
		{{/table-simple/table-detail-inline}}

	* o bien podemos crearnos nuestro propio template
********************************************


*La edición en linea tal y como está hecha no se comporta bien con el botón de ocultar y mostrar columnas, se puede deshabilitar la edición en línea cuando se habilite este botón

*Para el diseño responsivo habrá que modificar los @media de table-simple.css

TODOS:
- Filtrado por columnas poder pasar array de valores por los que queremos que se filtre la columna, por ejemplo si mi columna tiene un template en el que se muestra video, descripción y autor, que podamos decirle al filtro que busque por todas esas propiedades o por la que queramos
- si añadimos nueva entrada se añade según la ordenación y es posible que no nos demos cuenta de que se ha insertado
averiguar como solucionar esto, podríamos irnos a la página donde se ha insertado y resaltarlo por ej.
- Añadir validate para cada propiedad (Esto quizás se haga a través del servidor)
- actualizar contenido filtrado si se hace un update o por si llegara un evento que cambiara los datos (Esperar para poder hacer pruebas)

