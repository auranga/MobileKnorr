// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
// set the data from the database to the array
var sound = Titanium.Media.createSound({
	url:'../audio/SD_KNORR_LOOP_002.wav'
});
sound.setLooping(true);
sound.play();

var db = Ti.Database.install('../Knorr.sqlite','Knorr');

var llave = Ti.UI.currentWindow.llave;

var title = Ti.UI.currentWindow.title;

var rows = db.execute('SELECT * FROM ingrediente WHERE id_grupo_alimenticio="' + llave + '"');
//var idfondo:rows.fieldByName('id_grupo_alimenticio'),

function setArray() {

	Ti.API.info('rows:' + rows.rowCount);

	// create the array

	var dataArray = [];

	while (rows.isValidRow()) {
		dataArray.push({
			title:'' + rows.fieldByName('nombre') + '',
			id:''+rows.fieldByName('id_ingrediente')+ '',
			hasChild:true,
			path:'ingredientes_specs.js',
			color:'#1c191b',
			left:'50',
			backgroundImage:'../imagenes/botonsios_ingredientes/'+rows.fieldByName('id_grupo_alimenticio') +'.png',
			backgroundSelectedColor:'orange',
			font: {
				fontFamily:'myriadpro-semibold',
				fontSize: '20px'
			},
			height: 'auto',
			width: 'auto'
		});
		rows.next();
	};

	// set the array to the tableView
	tableview.setData(dataArray);
};

// create table view

var tableview = Ti.UI.createTableView({
	//backgroundImage:'../imagenes/f'+rows.fieldByName('id_grupo_alimenticio') +'.png',
});

tableview.addEventListener('click', function(e) {
	if (e.rowData.path) {
		var db = Ti.Database.install('../Knorr.sqlite','Knorr');
		var rows = db.execute('SELECT * FROM ingrediente WHERE id_ingrediente = "' + e.rowData.id + '"');
		var grupo = db.execute('SELECT * FROM grupo_alimenticio WHERE nombre = "' + title + '"');
		var favorito = db.execute ('SELECT * FROM ingredientes_favoritos WHERE id_ingrediente = "' + e.rowData.id + '"');

		var agregado= false;
		if(favorito.rowCount > 0) {
			agregado = true;
		}

		Ti.API.info('valores: ' + favorito.rowCount);
		Ti.API.info('agregado = ' + agregado);

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
				nombreGrupo:grupo.fieldByName('nombre'),
				informacion:grupo.fieldByName('informacion'),
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
		Ti.App.addEventListener('agregarFavoritos', function(e) {

			if (!agregado) {
				agregado = true;
				var agregar = db.execute ('INSERT INTO ingredientes_favoritos (id_ingrediente) VALUES ("'+e.idi+'")');
				Ti.API.info('Datos Insertados llave idi: '+e.idi)
			}
		});
		Ti.App.addEventListener('borrarFavoritos', function(e) {
			if(agregado) {
				agregado = false;
				var borrar = db.execute ('DELETE FROM ingredientes_favoritos WHERE id_ingrediente = "'+e.idi+'"');
				Ti.API.info('Datos borrados llave idi: '+e.idi)
			}
		});
		ahf.add(webview);
		Titanium.UI.currentTab.open(ahf, {
			animated:true
		});
	}
});
currentWin.add(tableview);
setArray();