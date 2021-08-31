<script src="{{ asset('js/angular.min.js') }}"></script>
<script src="{{ asset('js/mainApp.js') }}"></script>
<body ng-app="myApp" ng-controller="myCtrl">

<h1 id='element+"@{{ x }}"+' ng-repeat="x in records">@{{x}}</h1>
<!---hellloooo- oooogo-->
