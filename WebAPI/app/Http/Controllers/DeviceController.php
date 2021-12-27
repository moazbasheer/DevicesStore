<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Device;
use Validator;

class DeviceController extends Controller
{
    public function list() {
        return response(Device::get(), 200);
    }

    public function listById($id) {
        return response(Device::where(['id' => $id])->get(), 200);
    }

    public function add(Request $req) {
        $rules = ['name' => 'required', 'price' => 'required'];
        $validator = Validator::make($req->all(), $rules);
        if($validator->fails()) {
            return $validator->errors();
        }

        $device = new Device;
        $device->name = $req->name;
        $device->price = $req->price;
        $status = $device->save();
        if($status) {
            return response(['res' =>'device added successfully'], 200);
        } else {
            return response(['res' => 'device adding failed'], 200);
        }
    }

    public function update(Request $req) {
        $rules = [
            'id' => 'required',
            'name' => 'required',
            'price' => 'required'
        ];
        
        $validator = Validator::make($req->all(), $rules);
        if($validator->fails()) {
            return $validator->errors();
        }
        $device = Device::find($req->id);
        $device->name = $req->name;
        $device->price = $req->price;
        $status = $device->save();
        if($status) {
            return response(['res' => 'device update succeeded'], 200);
        } else {
            return response(['res' => 'device update failed'], 200);
        }
    }

    public function delete(Request $req) {
        $rules = ['id' => 'required'];
        $validator = Validator::make($req->all(), $rules);
        if($validator->fails()) {
            return $validator->errors();
        }
        
        $device = Device::find($req->id);
        $status = $device->delete();
        if($status) {
            return response(['res' => 'device delete succeeded'], 200);
        } else {
            return response(['res' => 'device delete failed'], 200);
        }
    }
    
}
