import { Injectable, EventEmitter } from '@angular/core';
import { SqliteDBService } from "./sqlitedb.service";

@Injectable()
export class DBService {

    private database: any;

    public constructor() {
		if(window['_cordovaNative']){
			this.database = new SqliteDBService();
		}
	}
	
	public get(){
		return this.database;
	}
}