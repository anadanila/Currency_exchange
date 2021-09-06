<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
class HomeController extends Controller
{

    public function __construct()
    {

    }
    public function index()
    {
        return view('home.index');
    }
    public function getDataToConvert(Request $request){
        $from =$request->input('base');;
        $to = $request->input('symbols');
        $amount = $request->input('amount');
        $ch=curl_init('https://api.exchangerate.host/latest?base='.$from.'');
        curl_setopt($ch, CURLOPT_FAILONERROR, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $json = curl_exec($ch);
        curl_close($ch);
        $conversionResult = json_decode($json, true);
        $front_currencies=array();
//        foreach ($to as $symbol){
//            $front_currencies[$symbol]=$conversionResult['rates'][$symbol];
//        }
        //return $front_currencies;
        return $conversionResult['rates'];
    }
}
