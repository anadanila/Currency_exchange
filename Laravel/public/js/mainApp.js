var app = angular.module("myApp", []);
app.run(function ($rootScope, $http) {
    $rootScope.returneazaConversii = function (valoare) {
        return valoare;
    };
    $rootScope.convert = function (amount, base_currency, rest_symbols) {
        var data = {
            base: base_currency,
            symbols: rest_symbols,
            amount: amount

        };
        return $http.post("http://127.0.0.1:8000/getdata", JSON.stringify(data)).then(function onSuccess(response, $scope) {
            // Handle success
            if (response.data) {
                $rootScope.resp = response.data;
                console.log(data);
                return $rootScope.resp;
            } else {
                console.log($rootScope.data);
                return $rootScope.data;

            }


        });


    }
});
app.controller("myCtrl", function ($scope, $rootScope) {

    var vm = this;
    vm.txtNum = ''; // set default value as empty to avoid error in directive
    vm.txtNumTwo = ''; //set default value as empty to avoid error in directive
    vm.base = '';
    $scope.records = {
        "EUR-Euro": {
            "image_path": 'images/flags/europe.png',
            "symbol": '€',
            "txtNum": '',
            "api_symbol": 'EUR',
            "unit_amount": ''
        },
        "USD-US-DOLLAR": {
            "image_path": 'images/flags/SUA.png',
            "symbol": '$',
            "txtNum": '',
            "api_symbol": 'USD',
            "unit_amount": ''
        },
        "RUB-RUSSIAN": {
            "image_path": 'images/flags/RUSIA.jpg',
            "symbol": '₽',
            "txtNum": '',
            "api_symbol": 'RUB',
            "unit_amount": ''
        }

    };

    $scope.onlyNumbers = /^\d+$/;
    $scope.changeColor = function () {
        $scope.myColorVariable = "Aqua";

        console.log($scope.records[Object.keys($scope.records)[$scope.selectedId]]['txtNum']);
        //base currency that user is tipyng
        amount = $scope.records[Object.keys($scope.records)[$scope.selectedId]]['txtNum'];
        base_currency = Object.keys($scope.records)[$scope.selectedId].split("-");
        base_currency = base_currency[0];
        // console.log('baza');
        // console.log(base_currency);
        //get the rest symbols from front
        symbols = Object.keys($scope.records);
        var arrayLength = symbols.length;
        rest_symbols = [];
        for (var i = 0; i < arrayLength; i++) {
            console.log(symbols[i]);

            symbols[i] = symbols[i].split("-");
            symbols[i] = symbols[i][0];
            if (symbols[i] != base_currency) {
                rest_symbols.push(symbols[i]);
            }

        }

        $rootScope.convert(amount, base_currency, rest_symbols).then(function (myresp) {
            $scope.myresp = myresp;
            console.log('all currencies');
            console.log($scope.myresp);
            if ($scope.myresp != undefined) {
                $scope.set_unit_conversion($scope.myresp);
            }
        })
        $scope.base_c = '1 ' + base_currency + '= ';
        $rootScope.base_c = $scope.base_c;
        $rootScope.base_currency = base_currency;
        console.log($scope.base_c);
        console.log('this is amount');
        // console.log($scope.records)
        // console.log(amount);
        // console.log('array cu restul simbolurilor');
        // console.log(rest_symbols);
        return $scope.myColorVariable;
    }
    $scope.selectedId = null;
    $scope.setSelected = function ($index) {
        $scope.selectedId = $index;
        console.log($scope.selectedId);
    }
    ///function that fills fields with conversion for 1 unit
    $scope.set_unit_conversion = function (current_sum) {
        $scope.base_sum = $scope.return_base();
        console.log('this is base sum');
        console.log($scope.base_sum);
        Object.keys($scope.records).forEach(function (key) {
            $scope.unit_converted = current_sum[$scope.records[key]['api_symbol']];
            console.log('conversiaa');
            console.log($scope.records[key]['unit_amount'] + $scope.unit_converted)
            $scope.records[key]['unit_amount'] = $scope.unit_converted + $scope.records[key]['api_symbol'];
            //if the currency is not the base, then update input with converted value
            if ($scope.base_currency != $scope.records[key]['api_symbol']) {
        ///the following lines will convert the base sum
                $scope.records[key]['txtNum'] = $scope.base_sum * $scope.unit_converted;
                console.log('formula' + $scope.base_sum + "*" + $scope.unit_converted);
            }


        });


    }
    $scope.return_base = function () {
        Object.keys($scope.records).forEach(function (key) {
            if ($scope.base_currency == $scope.records[key]['api_symbol']) {
                console.log($scope.records[key]['txtNum']);
                $scope.searched = $scope.records[key]['txtNum'];
            }

        });
        if ($scope.searched != '') {
            console.log($scope.searched);
            return $scope.searched;
        }
    }


});

angular.module('myApp').directive('numOnly', numOnly);

function numOnly() {
    var directive = {
        restrict: 'A',
        scope: {
            ngModel: '=ngModel'
        },
        link: link
    };

    return directive;

    function link(scope, element, attrs) {
        scope.$watch('ngModel', function (newVal, oldVal) {
            var arr = String(newVal).split('');
            if (arr.length === 0) return;
            if (arr.length === 1 && (arr[0] === '-' || arr[0] === '.')) return;
            if (isNaN(newVal)) {
                scope.ngModel = oldVal;
            }
        });
    }
}
