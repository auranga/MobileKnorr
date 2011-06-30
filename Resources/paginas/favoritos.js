var currentWin = Ti.UI.currentWindow;

var the_img = Titanium.UI.createImageView({
	image:'../imagenes/favorito_header.png',
	top:10,
	left:'center'
})

var sound = Titanium.Media.createSound({
	url:'../audio/SD_KNORR_LOOP_001.wav'
});

sound.setLooping(true);
sound.play();

var db = Ti.Database.install('../Knorr.sqlite','Knorr');

var llave = Ti.UI.currentWindow.llave;

var rows = db.execute('SELECT ingrediente.nombre, ingrediente.id_ingrediente FROM ingrediente INNER JOIN ingredientes_favoritos ON  ingrediente.id_ingrediente = ingredientes_favoritos.id_ingrediente');

//var rows = db.execute('SELECT * FROM ingredientes_favoritos');

function setArray() {

	// create the array
	var dataArray = [];

	while (rows.isValidRow()) {
		dataArray.push({
			//title:'' + rows.fieldByName('id_ingrediente_favorito') + '',
			title:'' + rows.fieldByName('nombre') + '',
			id:''+rows.fieldByName('id_ingrediente')+ '',
			hasChild:true,
			path:'ingredientes_specs.js'
		});
		rows.next();
	};

	// set the array to the tableView
	tableview.setData(dataArray);
};

var tableview = Ti.UI.createTableView({
	//backgroundImage:'../imagenes/fondo.jpg'
});

tableview.addEventListener('click', function(e) {
	if (e.rowData.path) {
		/*var ahf = Ti.UI.createWindow({
		 url:e.rowData.path,
		 llave:e.rowData.id,title:e.rowData.title
		 });
		 Ti.UI.currentTab.open(ahf);;*/

		var db = Ti.Database.install('../Knorr.sqlite','Knorr');
		var rows = db.execute('SELECT * FROM ingrediente WHERE id_ingrediente="' + e.rowData.id + '"');
		Ti.API.info('id abajo:' + rows);

		var agregado = true;

		var ahf = Ti.UI.createWindow({
			fullscreen:false,
			title:e.rowData.title
		});
		var webview = Titanium.UI.createWebView({
			url:'ingredientes_specs.html'
			//url:'webview-local.html'

		});

		webview.addEventListener('load', function() {
			Ti.App.fireEvent('pageReady', {
				llave:e.rowData.id,
				idFondo:'../imagenes/fondosHTML/'+rows.fieldByName('id_grupo_alimenticio') + '.png',
				idIconito:'../imagenes/iconitos/'+rows.fieldByName('id_grupo_alimenticio') + '.png',
				imagen_url:'../imagenes/ingredientes/'+rows.fieldByName('id_ingrediente') + '.png',
				// ME FALTA ARREGLAR ESTE PEDO!!! nombreGrupo:grupo.fieldByName('nombre'),
				nombre:rows.fieldByName('nombre'),
				energia:rows.fieldByName('energia'),
				proteina:rows.fieldByName('proteina'),
				lipidos:rows.fieldByName('lipidos'),
				fibra:rows.fieldByName('fibra'),
				colesterol:rows.fieldByName('colesterol'),
				calcio:rows.fieldByName('calcio'),
				hierro:rows.fieldByName('hierro'),
				sodio:rows.fieldByName('sodio'),
				vitamina_a:rows.fieldByName('vitamina_a'),
				potasio:rows.fieldByName('potasio'),
				favorito:agregado
			});
		});
		//Ti.App.addEventListener('fromWebview',function(e){  Ti.API.info('from webview: '+e.msg);});

		Ti.App.addEventListener('agregarFavoritos', function(e) {
			var agregar = db.execute ('INSERT INTO ingredientes_favoritos (id_ingrediente) VALUES ("'+e.idi+'")');
			agregar;
			//Ti.API.info('Datos Insertados llave: '+e.llave)
			Ti.API.info('Datos Insertados llave idi: '+e.idi)
		});
		Ti.App.addEventListener('borrarFavoritos', function(e) {
			var borrar = db.execute ('DELETE FROM ingredientes_favoritos WHERE id_ingrediente = "'+e.idi+'"');
			borrar;
			//alert('Datos Borrados');
			Ti.API.info('Datos borrados llave idi: '+e.idi)
		});
		ahf.add(webview);
		Titanium.UI.currentTab.open(ahf, {
			animated:true
		});
	}
});
//tableview.add(the_img);
currentWin.add(tableview);

setArray();