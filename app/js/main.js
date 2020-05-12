// adds social class to get social chart
// let element = document.getElementsByClassName("chart-area");
// for(var i = 0; i < element.length; i++)
// {
//     element[i].className += " social";
// }


Highcharts.setOptions({
    lang: {
      thousandsSep: ','
    }
});

let chartIdSpx1Yr = document.getElementById("chart-container-spx-1yr");

// checks for the chart ID and displays a backup image if the browser can't find it
setTimeout(function() {
    if(chartIdSpx1Yr.innerHTML === "") {
        // console.log('noId');
        let chartArea = document.getElementsByClassName("chart-area-spx-1yr");
        for(var i = 0; i < chartArea.length; i++) {
            chartArea[i].style.display = "none";
        } 
        // insert chart screenshot here
        document.getElementById("chart-fallback").innerHTML += '<img src="https://fm-static.cnbc.com/awsmedia/chart/2019/10/08/chart-error_wide.1570569331252.png" style="width: 100%;max-width:660px">';
    } else {
        // console.log('yesId')
    }
},500);

function drawHighcharts() {
    Highcharts.chart(chartIdSpx1Yr, {
        chart: {
            type: 'line',
            styledMode: true,
            spacingBottom: 25,
            spacingRight: 100,
            spacingLeft: 0,
            spacingTop: 20
        }, 
        title: {
            text: null
        },
        data: {
            googleSpreadsheetKey: '1zlXn2MJT0q39pO34jMfHRJhvx8aJ0jcC0y7ZdCUKnrg'
        },
        // for bar charts only
        plotOptions: {
            series: {
                groupPadding: 0.1
            } 
        },
        // for line charts only
        // plotOptions: {
        //     series: {
        //         lineWidth: 1,
        //         // clip: false,
        //         marker: {
        //             enabled: false,
        //             symbol: 'circle',
        //             fillColor: '#ffffff',
        //             states: {
        //                 hover: {
        //                     fillColor: '#ffffff'
        //                 }
        //             }
        //         }
        //     }
        // },
        legend: {
            enabled: false
        },
        xAxis: {
            labels: {
                style: {
                    whiteSpace: 'nowrap'
                }
            },
            tickLength: 5,
            plotBands: [{
                from: 1582142415000,
                to: 1584993615000,
                label: {
                    text: '<b>-34%</b>',
                    align: 'right',
                    y: -5
                }
             }]
            // edits xAxis ticks
            // dateTimeLabelFormats: {
            //     week: '%b. %e',
            // },
            // tickInterval: 24 * 3600 * 1000 * 7
        },
        yAxis: {
            title: false,
            labels: {
                useHTML: true,
                overflow: 'allow',
                formatter: function () {
                    return Highcharts.numberFormat(this.value,0,'.',',');
                },
            },
            // adds commas to thousands
        },
        credits: {
            enabled: false
        },
        tooltip: {
            shadow: false,
            padding: 10
        },
        responsive: {
            rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                chart: {
                spacingRight: 10
                },
                legend: {
                    align: 'left',
                    x: -18
                },
                tooltip: {
                    enabled: false
                }
            }
            }]
        }
    })
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    drawHighcharts();
} else {
    document.addEventListener("DOMContentLoaded", drawHighcharts);
}