import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {
	
	public serverURL: String = "http://backend:3000/";
	// private serverURL: String = "https://api.sweetsuomi.com/";
	// public cloudFrontURL: String = "https://s3-eu-west-1.amazonaws.com/beta.resources.sweetsuomi.com/";
	public cloudFrontURL: String = "https://s3-eu-west-1.amazonaws.com/resources.sweetsuomi.com/";

  constructor() {}
	
	public getServerURL(): String {
		return this.serverURL;
	}
	
	public getCloudFrontUrl(): String {
		return this.cloudFrontURL;
	}
	
}
