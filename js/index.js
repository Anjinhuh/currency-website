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
    
    const date = new Date()
    const ok = new Date()
    const dataAtual = String(date.getUTCFullYear())+'0'+String(date.getUTCMonth()+1)+ date.getUTCDate()
    const dataAntiga = String(dataAtual-7)

        
        window.onload = function (){
            
            fetch(`https://economia.awesomeapi.com.br/USD-BRL/7?start_data=${dataAntiga}&end_date=${dataAtual}`).then(x =>{
                return x.json()
            }).then(precoDolar =>{
                const dolar = precoDolar[0]
                const date  =  String(dolar.create_date[8]  +  dolar.create_date[9])
        
        
                        var dataPoints = [];
                        
                        var options =  {
                            animationEnabled: true,
                            theme: "light1",
                            title: {
                                text: "Cotação"
                            },
                            axisX: {
                                valueFormatString: dataPoints.x,
                                interval:1,
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
                            var buyCurrency = document.getElementById('currency-buy-price')
                            var sellCurrency = document.getElementById('currency-sell-price')
                            var sellCurrency2 = document.getElementById('currency-sell-price2')
                            var percentualVariation = document.getElementById('variation-percentual')
                            
                            if(data){
                                 buyCurrency.innerHTML = precoDolar[0].bid
                                 sellCurrency.innerHTML = precoDolar[0].ask
                                 sellCurrency2.innerHTML = precoDolar[0].ask                         
                                 percentualVariation.innerHTML = precoDolar[0].varBid +'%'
                          
                                for (var i = 0; i < 7; i++) {
                                    if(date > 0){
                                        let date = 7
                                        dataPoints.push({
                                            x: Number(date-i),
                                            y: Number(data[i].ask)
                                       });
                                    } else{
                                        dataPoints.push({
                                            x: Number(date-i),
                                            y: Number(data[i].ask)
                                       });
                                    }
                                     
                                    
                                }
                                
                            }
                            
                            $("#chartContainer").CanvasJSChart(options);
                            
                        }
                        $.getJSON(`https://economia.awesomeapi.com.br/USD-BRL/7?start_data=${dataAntiga}&end_date=${dataAtual}`, addData);
                        
                        
                        
                        
                })
            }
async function currency(currencyValue){
    currency.moeda = "USD-BRL"
   
 }