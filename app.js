
const express=require('express')
const https=require('https')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',function(req,res)
{
    res.sendFile(__dirname + '/index.html')
})
app.post('/',function(req,res)
{
    const query=req.body.cityname
    const apikey='c8faf250ce109b263b9b981ad4bf8348'
    const units='metric'
    const URL='https://api.openweathermap.org/data/2.5/weather?q='+ query +',in&appid='+ apikey +'&units='+ units 
   
    https.get(URL,function(response){
        console.log(response.statusCode)
        response.on('data',function(data)
        {
            // console.log(data)
            const wData=JSON.parse(data)
            const temp=wData.main.temp
            const desc=wData.weather[0].description
            const icon=wData.weather[0].icon
            const imageURL='https://openweathermap.org/img/wn/'+ icon +'@2x.png'
            res.write('<p>Currently Weather is '+ desc + '</p>')
            res.write('<h1>The Temprature in '+ query +' is '+ temp + ' &degC</h1>')
            res.write('<img src='+ imageURL +'>')
            res.send()
        })
    })
})


app.listen(3000,function(){
    console.log('Server is running at Port:3000')
})