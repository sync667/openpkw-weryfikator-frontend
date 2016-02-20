const HTTP = new WeakMap();
const Q = new WeakMap();

class ChartDataService {
    constructor($q, $http) {
        HTTP.set(this, $http);
        Q.set(this, $q);
    }

    loadPollingData() {
        var deferred = Q.get(ChartDataService.instance).defer();
        ChartDataService.instance.data = HTTP.get(ChartDataService.instance).get('resources/chart-data.json').then((data) => {
            deferred.resolve(data);
            return deferred.promise;
        });

    };

    getGeneralResults() {
        var deferred = Q.get(ChartDataService.instance).defer();
        ChartDataService.instance.data.then((data) => {
            var votes = data.data.voteCommittees;
            var totalVotes = data.data.votersVoteNumber;

            var series = votes.map((item) => (item.votes / totalVotes) * 100);

            var result = {
                "chart": {
                    "labels": votes.map((item) => item.name),
                    "series": [
                        series
                    ]
                },
                "max": series.reduce((prev, curr) => prev > curr ? prev : curr)
            };
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    getProtocolCount() {
        var deferred = Q.get(ChartDataService.instance).defer();
        ChartDataService.instance.data.then((data) => {
            var result = {
                "chart": {
                    "labels": ["Odebrane", "Nieodebrane"],
                    "series": [data.data.protocolNumber, data.data.protocolAllNumber - data.data.protocolNumber]
                },
                "sum": data.data.protocolAllNumber
            };
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    getTurnoutData() {
        var deferred = Q.get(ChartDataService.instance).defer();
        ChartDataService.instance.data.then((data) => {
            var result = {
                "chart": {
                    "labels": ["Odebrane", "Nieodebrane"],
                    "series": [data.data.votersVoteNumber, data.data.allVotersNumber - data.data.votersVoteNumber]
                },
                "sum": data.data.allVotersNumber
            };
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    static factory($q, $http) {
        ChartDataService.instance = new ChartDataService($q, $http);
        ChartDataService.instance.loadPollingData();
        return ChartDataService.instance;
    }
}

ChartDataService.factory.$inject = ['$q', '$http'];


export default ChartDataService;