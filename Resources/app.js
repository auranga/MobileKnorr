// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({
	title:'Home',
	url:'paginas/grupo_alimenticio.js',
	fullscreen:false,
	height: 440,
	tabBarHidden: false
});

var tab1 = Titanium.UI.createTab({
	icon:'imagenes/btn_home.png',
	title:'Home',
	window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'Aplicacion KNORR',
	font: {
		fontSize:20,
		fontFamily:'Helvetica Neue'
	},
	textAlign:'center',
	width:'auto'
});

var win2 = Titanium.UI.createWindow({
	title:'Favoritos',
	url:'paginas/favoritos.js',
	fullscreen:false,
	height: 440,
	tabBarHidden: false
});

var tab2 = Titanium.UI.createTab({
	icon:'imagenes/icon_favorito.png',
	title:'Favoritos',
	window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'Favoritos',
	font: {
		fontSize:20,
		fontFamily:'Helvetica Neue'
	},
	textAlign:'center',
	width:'auto'
});

//win1.add(label1);
//win2.add(label2);
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

// open tab group
tabGroup.open();