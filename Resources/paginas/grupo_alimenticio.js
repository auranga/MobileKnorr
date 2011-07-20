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

	Ti.API.info('rows:' + rows.rowCount);
	// create the array
	var dataArray = [];

	while (rows.isValidRow()) {
		dataArray.push({
			leftImage:'../imagenes/iconitos/'+rows.fieldByName('id_grupo_alimenticio') + '.png',
			title:''+rows.fieldByName('nombre')+ '',
			id:''+rows.fieldByName('id_grupo_alimenticio')+ '',
			hasChild:true,
			path:'ingredientes.js',
			color:'#1c191b',
			left:'2',
			backgroundImage:'../imagenes/botonsios/'+rows.fieldByName('id_grupo_alimenticio') +'.png',
			backgroundSelectedColor:'orange',
			font: {
				fontFamily:'myriadpro-semibold',
				fontSize: '20px'
			},
			height: 'auto',
			width: 'auto'
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
			//fullscreen:true,
			//statusBarHidden:true,
			//tabBarHidden:true,
			url:e.rowData.path,
			llave:e.rowData.id,
			title:e.rowData.title
		});

		Ti.UI.currentTab.open(ahf, {
			animated:true
		});

	}
});
// add the tableView to the current window
currentWin.add(tableview);

// call the setArray function to attach the database results to the array
setArray();