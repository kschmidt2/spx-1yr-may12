// adds social class to get social chart
// let element = document.getElementsByClassName("chart-area");
// for(var i = 0; i < element.length; i++)
// {
//     element[i].className += " social";
// }

// bolds the subhead if there is no headline
let subhead = document.getElementsByClassName("chart-subhead"),
    headline = document.getElementById("chart-head");
    if (!headline) {
        for(var i = 0; i < subhead.length; i++) {
            subhead[i].style.fontWeight = "600";
        }       
     }

Highcharts.setOptions({
    lang: {
      thousandsSep: ','
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const myChart = setTimeout(function(){
        Highcharts.chart('chart-container', {
            chart: {
                type: 'bar',
                styledMode: true,
                spacingBottom: 25,
                spacingRight: 100
            }, 
            title: {
                text: null
            },
            data: {
                googleSpreadsheetKey: '1YOKb5l2VM4aAB2r20N_1aT_1vEajYrP3U-U3A6lZbC0'
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
                align: 'right',
                symbolRadius: 0,
                verticalAlign: 'top',
                x: 10,
                itemMarginTop: -10
            },
            xAxis: {
                labels: {
                    style: {
                        whiteSpace: 'nowrap'
                    }
                },
                tickLength: 5
            },
            yAxis: {
                title: false,
                labels: {
                    useHTML: true,
                    overflow: 'allow'
                }
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
        });
    }, 1000);
});