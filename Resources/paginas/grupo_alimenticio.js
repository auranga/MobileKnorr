
var currentWin = Ti.UI.currentWindow;


var sound = Titanium.Media.createSound({
	url:'../audio/SD_KNORR_LOOP_001.wav'
});
sound.setLooping(true);
sound.play(); 


function setArray() {

	var db = Ti.Database.install('../Knorr.sqlite','Knorr');

	var rows = db.execute('SELECT * FROM grupo_alimenticio');

	
	Ti.API.info('rows:' + rows.rowCount);
	
	
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
		rows.next();
	};

	
	tableview.setData(dataArray);
};


var tableview = Ti.UI.createTableView({

});


tableview.addEventListener('click', function(e) {
	if (e.rowData.path) {

		var ahf = Ti.UI.createWindow({
			url:e.rowData.path,
			llave:e.rowData.id,
			title:e.rowData.title
		});

		Ti.UI.currentTab.open(ahf, {
			animated:true
		});

	}
});

currentWin.add(tableview);


setArray();