Titanium.UI.setBackgroundColor('#000');


var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({
	title:'Home',
	height:440,
	animated:true,
	tabBarHidden:true,
	backgroundColor: '#111',
    url:'paginas/grupo_alimenticio.js',
});

var tab1 = Titanium.UI.createTab({
	icon:'imagenes/btn_home.png',
	title:'Home',
	window:win1
});

var win2 = Titanium.UI.createWindow({
	title:'Favoritos',
	height: 440,
	animated:true,
	tabBarHidden:true,
	url:'paginas/favoritos.js',
});

var tab2 = Titanium.UI.createTab({
	icon:'imagenes/icon_favorito.png',
	title:'Favoritos',
	window:win2
});

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);

tabGroup.open();