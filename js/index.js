// var real = document.getElementById('preco-real')
// var variacao = document.getElementById('variacao-valor')

// fetch('https://economia.awesomeapi.com.br/json/last/USD').then(x =>{
//     return x.json()
// }).then(dolarHoje =>{
//     const api = dolarHoje.USDBRL
//     var valorMaximo = Number(api.high)
//     var variacaoValor = Number(api.pctChange)
//     real.innerHTML = valorMaximo.toFixed(2)
//     variacao.innerHTML = variacaoValor.toFixed(2)
// })



/*
   GRAFICO CANVAS
*/

/*
   INFORMACOES ULTIMOS 7 DIAS
*/
    

window.onload = function (){

    fetch(`https://economia.awesomeapi.com.br/json/daily/USD/7`).then(x =>{
        return x.json()
    }).then(precoDolar =>{
        const dolar = precoDolar
        //console.log(dolar)        
        

                var dataPoints = [];
                
                var options =  {
                    animationEnabled: true,
                    theme: "light1",
                    title: {
                        text: "Cotação"
                    },
                    axisX: {
                        valueFormatString: dataPoints.x,
                        interval: 1 ,
                    },
                    axisY: {
                        title: "R$",
                        titleFontSize: 30,
                        valueFormatString: dataPoints.y,
                        interval: 0.01,
                     },
                    data: [{
                        type: "spline", 
                        yValueFormatString: dataPoints.y,
                        dataPoints: dataPoints
                    }]
                };
                
                function addData(data) {
                    if(data){
                        for (var i = 0; i < 7; i++) { 
                                
                                let dateNew = data[i].timestamp
                                function EpochToDate(epoch) {
                                    if (epoch < 10000000000)
                                        epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
                                    var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone        
                                    return new Date(epoch);
                                }
                                console.log( EpochToDate(dateNew).getUTCDate())
                                dataPoints.push({
                                    x: Number(EpochToDate(dateNew).getUTCDate()),
                                    y: Number(data[i].ask)
                               });
                        }
                    }
                    
                    $("#chartContainer").CanvasJSChart(options);
                
                }
                $.getJSON(`https://economia.awesomeapi.com.br/json/daily/USD/7`, addData);
                
                
                
        })
    }