// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;

var sound = Titanium.Media.createSound({
	url:'../audio/SD_KNORR_LOOP_001.wav'
});
sound.setLooping(true);
sound.play();


// set the data from the database to the array
function setArray() {

	var db = Ti.Database.install('../Knorr.sqlite','Knorr');

	var rows = db.execute('SELECT * FROM grupo_alimenticio');

	Ti.API.info('rows:' + rows);
	// create the array
	var dataArray = [];

	while (rows.isValidRow()) {
		dataArray.push({
			backgroundImage:'../imagenes/'+rows.fieldByName('id_grupo_alimenticio') +'.png'+ '',
			id:''+rows.fieldByName('id_grupo_alimenticio')+ '',
			titulo:''+rows.fieldByName('nombre')+ '',
			hasChild:true,
			path:'ingredientes.js'
		});
		///dataArray.push({});
		rows.next();
	};

	// set the array to the tableView
	tableview.setData(dataArray);
};

// create table view
var tableview = Ti.UI.createTableView({
	
});

tableview.addEventListener('click', function(e) {
	if (e.rowData.path) {
		
		var ahf = Ti.UI.createWindow({
			fullscreen:false,
			url:e.rowData.path,
			llave:e.rowData.id,
			title:e.rowData.titulo
		});

		Ti.UI.currentTab.open(ahf);

	}
});
// add the tableView to the current window
currentWin.add(tableview);

// call the setArray function to attach the database results to the array
setArray();