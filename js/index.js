var options = {
    series: [],
    chart: {
        height: '100%',
        type: 'area',
        toolbar: { show: false },
        foreColor: 'white',
        zoom: {enabled:false,},
  },
  dataLabels: {
    enabled: true,
    
  },
  
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    categories: []
  },
};

const weather = null
const regions = {
    "KR-11": 1,
    "KR-26": 2,
    "KR-27": 3,
    "KR-28": 4,
    "KR-29": 5,
    "KR-30": 6,
    "KR-31": 7,
    "KR-41": 8,
    "KR-42": 9,
    "KR-43": 10,
    "KR-44": 11,
    "KR-45": 12,
    "KR-46": 13,
    "KR-47": 14,
    "KR-48": 15,
    "KR-49": 16,
    "KR-50": 17,
}

const timeDOM = document.querySelectorAll(".time")
const iframes = document.getElementsByTagName('iframe')

const timeManager = () => {
    const init_date = new Date()
    const init_time = init_date.getHours() + "시 " + init_date.getMinutes() + "분 "
    for (let i=0; i<timeDOM.length; i++) {
        timeDOM[i].innerHTML = init_time
    }

    setInterval(() => {
        const date = new Date()
        const time = date.getHours() + "시 " + date.getMinutes() + "분 "
    
        for (let i=0; i<timeDOM.length; i++) {
            timeDOM[i].innerHTML = time
        }
    }, 6000)
}

// const h123123a1232c2323123k = (delay) => {
//     setInterval(() => {
//         for (let i=0; i<iframes.length; i++) {
//             iframes[i].contentWindow.location.reload()
//         }
//     }, delay)

//     for (let i=0; i<iframes.length; i++) {
//         iframes[i].onload = () => {
//             const iframeDocument = iframes[i].contentWindow.document;
//             console.log(iframeDocument.querySelector('.attribution'))
//         }
//     }
// }
let tempInfo =document.getElementById("temp-info")
let rainInfo = document.getElementById("rain-info")
tempInfo.hidden = false
rainInfo.hidden=true


const getKeyByValue = (obj, value) => {
    return Object.keys(obj).find(key => obj[key] === value);
}
  
const getWeather = async (id) => {
    const res = await fetch('https://weather.devdev.kr/' + id)
    return res.json()
}

const getAllRecentWeather = async () => {
    const res = await fetch('https://weather.devdev.kr/all/recent')
    return res.json()
}

const getAll = async () => {
    const res = await fetch('https://weather.devdev.kr/all')
    return res;
}

const initMapStatus = async (svgDocument, data) => {
    data.forEach(item => {
        const target = svgDocument.getElementById(getKeyByValue(regions, item.id))
        const temp = item.temp 
        const wind = item.wind
        target.setAttribute('fill', 'green')
        if (tempInfo.hidden === false) {
            if (temp >= wind && temp > 10) {
                if (temp >= 33) {
                    target.setAttribute('fill', 'orange')
                }
                else if (temp >= 35) {
                    target.setAttribute("fill", "red")
                }
            }
        }
        else {
            if (item.status === "비") {
                target.setAttribute('fill', 'blue')
            }
        }
    })
}
const toggleRegister = (svgDocument, data) => {
    const radioButton = document.querySelectorAll(".radio")

    for (let i=0; i<radioButton.length; i++) {
        radioButton[i].addEventListener('click' , (event) => {
            const clickedBtn = document.getElementById(event.target.id)
            
            for (let j=0; j<radioButton.length; j++) {
                radioButton[j].checked = false
            }

            clickedBtn.checked = true;
            if (clickedBtn===radioButton[0]){
                tempInfo.hidden=false;
                rainInfo.hidden=true;
                initMapStatus(svgDocument,data)
               
            }
            else{
                tempInfo.hidden =true;
                rainInfo.hidden =false;
                initMapStatus(svgDocument,data)
            }
        })
    }
}
const getInitGraphData = () => {
    const seriesTemp = [];
    for (let i = 0; i < this.weather.length; i++) {
        seriesTemp.push({
            "x": this.weather[i].name,
            "y": this.weather[i].temp,
        });
    }
    const seriesHumid = [];
    for (let i = 0; i < this.weather.length; i++) {
        seriesHumid.push({
            "x": this.weather[i].name,
            "y": this.weather[i].humidity,
        });
    }
    const seriesWind = [];
    for (let i = 0; i < this.weather.length; i++) {
        seriesWind.push({
            "x": this.weather[i].name,
            "y": this.weather[i].wind,
        });
    } 


    var options ={
        "annotations": {},
        "chart": {
            "animations": {
                "enabled": true,
                "easing": "swing"
            },
            "background": "",
            "foreColor": "white",
            "height":  "100%",
            "stacked": true,
            "toolbar": {
                "show": true
            },
            "type": "bar",
            "width": "100%",
        },
        "plotOptions": {
            "bar": {
                "borderRadius": 10,
                "borderRadiusApplication": "end",
                "borderRadiusWhenStacked": "last",
                "hideZeroBarsWhenGrouped": false,
                "isDumbbell": false,
                "isFunnel": false,
                "isFunnel3d": true,
                "dataLabels": {
                    "total": {
                        "enabled": false,
                        "style": {
                            "color": "white",
                            "fontSize": "5px",
                            "fontWeight": 600
                        }
                    }
                }
            },
            "bubble": {
                "zScaling": true
            },
            "treemap": {
                "dataLabels": {
                    "format": "scale"
                }
            },
            "radialBar": {
                "hollow": {
                    "background": "#fff"
                },
                "dataLabels": {
                    "name": {},
                    "value": {},
                    "total": {}
                }
            },
            "pie": {
                "donut": {
                    "labels": {
                        "name": {},
                        "value": {},
                        "total": {}
                    }
                }
            }
        },
        "colors": [
            "#4ecdc4",
            "#c7f464",
            "#81D4FA",
            "#fd6a6a",
            "#546E7A"
        ],
        "dataLabels": {
            "enabled": true,
            "style": {
                "fontWeight": 500
            }
        },
        "grid": {
            "padding": {
                "right": 25,
                "left": 15
            }
        },
        "legend": {
            "floating": true,
            "fontSize": 14,
            "horizontalAlign": "center",
            "position": "top",
            "margin":"5px",
            "offsetY": -17,
            "markers": {
                "shape": "square",
                "size": 8
            },
            "itemMargin": {
                "vertical": 0
            }
        },
        "series": [
            {
                "name": "온도",
                "data": seriesTemp
            },
            {
                "name": "습도",
                "data": seriesHumid
            },
            { 
                "name": "풍속",
                "data": seriesWind
            }
        ],
        "fill": {
            "type": "gradient",
            "pattern": {
                "width": 25
            }
        },
        "stroke": {
            "fill": {
                "type": "solid",
                "opacity": 0.85,
                "gradient": {
                    "shade": "dark",
                    "type": "horizontal",
                    "shadeIntensity": 0.5,
                    "inverseColors": true,
                    "opacityFrom": 1,
                    "opacityTo": 1,
                    "stops": [
                        0,
                        50,
                        100
                    ],
                    "colorStops": []
                }
            }
        },
        "tooltip": {
            "shared": false,
            "intersect": true
        },
        "xaxis": {
            
            "labels": {
                "trim": true,
                "style": {
                    "color":"white" 
                }
            },
            
            "tickPlacement": "between",
            "title": {
                "style": {
                    "fontWeight": 700
                }
            },
            "tooltip": {
                "enabled": false
            }
        },
        "yaxis": {
            "show": false,
            "tickAmount": 5,
            "labels": {
                "style": {}
            },
            "title": {
                "style": {
                    "fontWeight": 700,
                    "color":"white"                }
            }
        },
        "theme": {
            "palette": "palette4"
        },
        "title":{
            "text":"전국 날씨"
        }
    };

    return options 
}


// MAIN
document.addEventListener("DOMContentLoaded", async () => {
    timeManager()
    

    const svgObject = document.getElementById("svgMap");
    const chartElement = document.querySelector(".graph-item");
    
    
    
    svgObject.addEventListener("load", async () => {
        const svgDocument = svgObject.contentDocument;
        const svgElement = svgDocument.getElementById("Korea") 
        this.weather = await getAllRecentWeather()
        await initMapStatus(svgDocument, this.weather)
        console.log(this.weather)
        toggleRegister(svgDocument,this.weather)
        const chart = new ApexCharts(chartElement, getInitGraphData());
        chart.render()
        
        svgElement.addEventListener("click", async (event) => {
            const txt = document.getElementById('degree')
            const res = await getWeather(regions[event.target.id]);
            txt.innerText= res.name
            const newSeriesArray = [];
           
            const tempSeries = {
                name:'온도',
                data: res.temp.map(item => item.value)
            }        

            const humiditySeries = {
                name: '습도',
                data: res.humidity.map(item => item.value)
            };
            
            const windSeries = {
                name: '풍속',
                data: res.wind.map(item => item.value)
            };

            tempSeries.data.reverse()
            humiditySeries.data.reverse()
            windSeries.data.reverse()

            newSeriesArray.push(windSeries);
            newSeriesArray.push(humiditySeries);
            newSeriesArray.push(tempSeries);
       
            this.options.xaxis.categories = (res.humidity.map(item => item.recordTime)).reverse();
            this.options.series = newSeriesArray;
            
            chart.destroy()
            const newChart = new ApexCharts(chartElement, this.options);
            newChart.render()
            
        });
    });
    
});