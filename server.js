var GoogleSheets = require('google-drive-sheets')
var express = require('express')
var app = express()
var path = require('path')
var PORT = process.env.PORT || 8000

var mySheet = new GoogleSheets('YOURGOOGLESHEETURL')
app.set('view engine', 'pug')

mySheet.getRows(1, function(err, rowData){
    console.log(rowData)
    var titles = []
    var contents = []
    for (var i = 0; i < rowData.length; i++){
        var itemT = rowData[i].name
        var itemC = rowData[i].grade
        titles += ' ' + itemT
        contents += ' ' + itemC
    }
    var titleS = titles.split(' ')
    var titleL = titleS.filter(Boolean)
    var contentS = contents.split(' ')
    var contentL = contentS.filter(Boolean)

    console.log(titleL)
    console.log(contentL)

    app.get('/', function(req, res){
        res.render(
            'index',
            { title: titleL, content: contentL }
        )
    })

    app.listen(PORT, function(){
        console.log('Example app listening on port', PORT)
    })
})
