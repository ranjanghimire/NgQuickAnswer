import { Injectable } from '@angular/core';
import { AppUser } from '../models/app.user';

@Injectable()
export class Configuration {
    public Server: string = "http://localhost";
    //public Server: string = "http://gmire-ranjanghimire.boxfuse.io";
    public port : string = "8080"
    public ApiUrl: string = "/";
    public ServerWithApiUrl = this.Server + ':' + this.port + this.ApiUrl;

    //TODO: Check if localStorage is empty and do some validation
    public myUser: AppUser = JSON.parse(localStorage.getItem("myUser"));

     public categories : string[] = [
        "Electronics",
        "Places",
        "Camera",
        "Hotels",
        "Restaurants"
    ];

}