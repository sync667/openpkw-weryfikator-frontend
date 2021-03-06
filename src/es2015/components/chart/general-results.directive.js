const SERVICE = new WeakMap();

class GeneralResultsDirective {
    constructor(chartDataService) {
        SERVICE.set(this, chartDataService);

        this.restrict = 'AE';
        this.scope = {};
        this.template = '<div id="general-results" class="ct-chart ct-perfect-fourth"></div>';
    }

    static directiveFactory(chartDataService) {
        GeneralResultsDirective.instance = new GeneralResultsDirective(chartDataService);
        return GeneralResultsDirective.instance;
    }

    link(scope, elem, attrs) {
        SERVICE.get(GeneralResultsDirective.instance).getGeneralResults().then((data) => {
            var options = {
                high: data.max + 1,
                low: 0,
                axisY: {
                    offset: 80,
                    labelInterpolationFnc: function(value) {
                        return value.toFixed(1) + ' %'
                    },
                    scaleMinSpace: 50
                }
            };
            new Chartist.Bar('#general-results', data.chart, options).on('draw', function(data) {
                if (data.type === 'label' && data.text.indexOf(' %') === -1) {
                    // adjust label position for rotation
                    const dX = data.width * 0.9 + (100 - data.width);
                    data.element.attr({ x: data.element.attr('x') - dX })
                }
                if(data.type === 'bar') {
                    data.element.attr({
                        style: 'stroke-width: 40px; stroke: #0000ff'
                    });
                }
            });
        });
    }
}

GeneralResultsDirective.directiveFactory.$inject = ['chartDataService'];

export default GeneralResultsDirective;