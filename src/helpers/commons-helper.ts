import { Headers, RequestOptions } from '@angular/http';

export class CommonsHelper {

  constructor() {}
	
	public requestHeaders(token): RequestOptions {
		let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/json');
		return new RequestOptions({ headers: headers });
	}

}
