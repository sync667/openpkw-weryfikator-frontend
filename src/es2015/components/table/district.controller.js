function districtCtrl(districtDataService, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
        return districtDataService.getDistrictDataList();
    }).withBootstrap()
        .withOption('responsive', true)
        .withPaginationType('full_numbers')
        .withLanguage({
            "sEmptyTable":     "Brak danych w tabeli",
            "sInfo":           "Wyświetlam _START_ do _END_ z _TOTAL_ rekordów",
            "sInfoEmpty":      "Wyświetlam 0 do 0 z 0 rekordów",
            "sInfoFiltered":   "(filtruje ze _MAX_ wszystkich rekordów)",
            "sInfoPostFix":    "",
            "sInfoThousands":  ",",
            "sLengthMenu":     "Pokaz _MENU_ rekordy",
            "sLoadingRecords": "Ładowanie...",
            "sProcessing":     "Przetwarzanie...",
            "sSearch":         "Szukaj:",
            "sZeroRecords":    "Brak rekordów spełniających kryteria",
            "oPaginate": {
                "sFirst":    "Pierwsza",
                "sLast":     "Ostania",
                "sNext":     "Następna",
                "sPrevious": "Poprzednia"
            },
            "oAria": {
                "sSortAscending":  ": aktywne sortowanie rosnące",
                "sSortDescending": ": aktywne sortowanie malejące"
            }
        });
    vm.dtColumns = [
        DTColumnBuilder.newColumn('number').withTitle('Nr Okręgu'),
        DTColumnBuilder.newColumn('name').withTitle('Siedziba Komisji Okręgowej'),
        DTColumnBuilder.newColumn('cities').withTitle('Miasta'),
        DTColumnBuilder.newColumn('peripherals').withTitle('Liczba otrzymanych protokołów %')
    ];
}

districtCtrl.$inject = ['districtDataService', 'DTOptionsBuilder', 'DTColumnBuilder'];

export default districtCtrl;