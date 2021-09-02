<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
class HomeController extends Controller
{

    public function __construct()
    {

    }
    public function index()
    {
        return view('home.index');
    }
//https://api.exchangeratesapi.io/v1/latest
//? access_key = API_KEY
//& base = USD
//& symbols = GBP,JPY,EUR
}
