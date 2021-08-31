<?php
?>
<html>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link href="{{ asset('css/index_style.css') }}" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"></script>
    <script src="{{ asset('js/angular.min.js') }}"></script>
    <script src="{{ asset('js/mainApp.js') }}"></script>
</head>
<body ng-app="myApp" ng-controller="myCtrl">

<p id="title_app">Currency exchange </p>


<!--divuri currency--->
<div class="container">
    <div class="row">
        <div class="col-md-4" ng-repeat="(name,val) in records" ng-click="setSelected($index)">
            <div id="closeablecard"
                 ng-style="$index === selectedId && myColorVariable=='Aqua'? {'background-color':'Aqua'} : {'background-color':'gainsboro'}"
                 class="card card-hover-shadow mt-4">
                <div class="card-header bg-transparent border-bottom-0">
                    <button data-dismiss="alert" data-target="#closeablecard" type="button" class="close"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="card-body mt-n5">
                    <div class="row">
                        <div class="col-md-4">
                            <img class="flag" src="{{ asset('') }}@{{val.image_path}}">@{{ val.symbol }}
                        </div>
                        <div class="col-md-8">
                            <input type="text" name="amount_to_convert" ng-keypress="changeColor()"
                                   ng-change="input1=val.txtNum;"
                                   class="form-control" ng-init="val.txtNum=''" ng-model="val.txtNum" num-only placeholder="Enter amount"
                            >
                            <input type="hidden" ng-model="input1" ng-init='input1=""' />
                            <h5 class="card-title">@{{name}}</h5>
                            <p class="card-text">
                                1 EUR=conversie
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!---->
</body>
</html>

