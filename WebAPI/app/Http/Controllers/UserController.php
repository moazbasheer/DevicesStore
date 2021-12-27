<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Validator;
class UserController extends Controller
{
    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if($validator->fails()) {
            return $validator->errors();
        }
    
        $user = User::where('email', $request->email)->first();
    
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response([
                'res' => 'failed to authenticate'
            ], 200);
        }
    
        $token = $user->createToken('my-app')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function register(Request $req) {
        
        $validator = Validator::make($req->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed'
        ]);

        if($validator->fails()) {
            return response($validator->errors(), 400);
        }
    
        $user = User::where('email', $req->email)->first();
    
        if ($user) {
            return response([
                'email' => ['This email is already used!'],
            ], 200);
        }
        $data = $req->all();
        $data['password'] = Hash::make($data['password']);
        
        $user = User::create($data);
        if($user) {
            return response([
                'res' => 'registered successfully',
                'p' => $user->password
            ], 200);
        }
        return response([
            'res' => 'failed to register'
        ], 200);
        
    }

    public function logout(Request $req) {
        auth()->user()->currentAccessToken()->delete();
        
        return response([
            'res' => 'logged out successfully'
        ], 200);
    }
}
