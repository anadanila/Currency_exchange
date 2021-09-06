var app = angular.module("myApp", []);
app.run(function($rootScope, $http) {
    $rootScope.returneazaConversii=function(valoare){
        return valoare;
    };
    $rootScope.convert = function (amount, base_currency, rest_symbols) {
        var data = {
            base: base_currency,
            symbols: rest_symbols,
            amount:amount

        };
      return  $http.post("http://127.0.0.1:8000/getdata", JSON.stringify(data)).then(function onSuccess(response, $scope) {
            // Handle success
            var data = response.data;
            if(data){
                return data;
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
            "txtNum": ''
        },
        "USD-US-DOLLAR": {
            "image_path": 'images/flags/SUA.png',
            "symbol": '$',
            "txtNum": ''
        }

    };

    $scope.onlyNumbers = /^\d+$/;
    $scope.changeColor = function () {
        $scope.myColorVariable = "Aqua";

        console.log($scope.records[Object.keys($scope.records)[$scope.selectedId]]['txtNum']);
        //base currency that user is tipyng
        amount=$scope.records[Object.keys($scope.records)[$scope.selectedId]]['txtNum'];
        base_currency = Object.keys($scope.records)[$scope.selectedId].split("-");
        base_currency = base_currency[0];
        console.log('baza');
        console.log(base_currency);
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
        //call function that send data to HomeController
        $scope.dataa=$rootScope.convert(amount, base_currency, rest_symbols)
        console.log($scope.dataa['$$state']);
        var log = [];
        angular.forEach($scope.dataa['value'], function( key) {
            this.push(key);
        }, log);
        console.log(log);
        console.log('conversiii');
        $scope.base_c='1 '+base_currency+'= ';
        $rootScope.base_c=$scope.base_c;
        console.log($scope.base_c);
        console.log('this is amount');
        console.log($scope.records)
        console.log(amount);
        console.log('array cu restul simbolurilor');
        console.log(rest_symbols);
        return $scope.myColorVariable;
    }
    $scope.selectedId = null;
    $scope.setSelected = function ($index) {
        $scope.selectedId = $index;
        console.log($scope.selectedId);
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
