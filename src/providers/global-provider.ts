import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {
	
	public serverURL: String = "http://backend:3000/"; // Development
	// public serverURL: String = "https://beta.sweetsuomi.com/api/v1/"; // Beta
	// private serverURL: String = "https://api.sweetsuomi.com/"; // Production
	public s3Url: String = "https://s3-eu-west-1.amazonaws.com/beta.resources.sweetsuomi.com/"; // Development & Beta
	// public s3Url: String = "https://s3-eu-west-1.amazonaws.com/resources.sweetsuomi.com/"; // Production
	public cloudFrontURL: String = "https://d3ksovztvyvzlz.cloudfront.net/"; // Development & Beta
	// public cloudFrontURL: String = "https://s3-eu-west-1.amazonaws.com/beta.resources.sweetsuomi.com/"; // Production

  constructor() {}
	
	public getServerURL(): String {
		return this.serverURL;
	}
	
	public getCloudFrontUrl(): String {
		return this.cloudFrontURL;
	}
	
}
