import { Injectable } from '@angular/core';


@Injectable()
export class Configuration {
    //public Server: string = "http://localhost";
    public Server: string = "http://gmire-ranjanghimire.boxfuse.io";
    public port : string = "8080"
    public ApiUrl: string = "/";
    public ServerWithApiUrl = this.Server + ':' + this.port + this.ApiUrl; 

}