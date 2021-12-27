<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\DeviceController;
use \App\Http\Controllers\UserController;
use \App\Http\Controllers\FileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::get('/list', [DeviceController::class, 'list']);
    Route::get('/list/{id}', [DeviceController::class, 'listById']);
    Route::post('/add', [DeviceController::class, 'add']);
    Route::put('/update', [DeviceController::class, 'update']);
    Route::delete('/delete', [DeviceController::class, 'delete']);
    Route::post('/logout', [UserController::class, 'logout']);
});

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);