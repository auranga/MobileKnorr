var currentWin = Ti.UI.currentWindow;  
  
var db = Ti.Database.install('../Knorr.sqlite','Knorr');  
  
var llave = Ti.UI.currentWindow.llave;  
  
var rows = db.execute('SELECT * FROM ingrediente WHERE id_ingrediente="' + llave + '"');  

var image = Titanium.UI.createImageView({url:'../' + rows.fieldByName('imagen_url')});

//var image = Titanium.UI.createImageView({url:'../imagenes/knorr_logo2.png'});


var data = [  
{title:'' + rows.fieldByName('energia') + '', header:'Energia'},   
{title:'' + rows.fieldByName('proteina') + '', header:'Proteina'},  
{title:'' + rows.fieldByName('lipidos') + '', header:'Lipidos'},
{title:'' + rows.fieldByName('fibra') + '', header:'Fibra'},   
{title:'' + rows.fieldByName('proteina') + '', header:'Proteina'}
];
currentWin.add(image);


var label1 = Titanium.UI.createLabel({
	
	color:'#999',
	text:data,
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});


//currentWin.add(label1);  

var tableview = Ti.UI.createTableView({  
	//win1.add(label1);  
	
    data:data
    //image:image,
   // backgroundImage:'../imagenes/fondo.jpg'
});  
  
currentWin.add(tableview);