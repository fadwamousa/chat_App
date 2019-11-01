<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;
use App\Events\ChatEvent;
class ChatController extends Controller
{
    //

    public function __construct(){
    	return $this->middleware('auth');
    }

    public function chat(){
    	return view('chat');
    }
  
    public function send(Request $request){
        
        $user = User::find(Auth::user()->id);
    	event(new ChatEvent($request->message , $user));
    }

     /*public function send(){
        $message = "Hello";
        $user = User::find(Auth::user()->id);
    	event(new ChatEvent($message , $user));
    }*/
}
