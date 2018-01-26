import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SqliteDBService {

    private isInstantiated: boolean;
	private isNotInitialized: boolean = false;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();
	private appVersion: string = "1.0";

    public constructor() {
		//console.log(this.isNotInitialized);
        if(!this.isInstantiated) {
            this.database = (<any>window).sqlitePlugin.openDatabase({name: 'hepac.db', location: 'default'});
			
			// Clean version
			//this.database.sqlBatch(['DROP TABLE IF EXISTS app_versions',], function(){}, function(e){});	

			this.database.sqlBatch([
				'CREATE TABLE IF NOT EXISTS app_versions (id INTEGER PRIMARY KEY, version TEXT UNIQUE, description TEXT)',
				], function() {
					console.log('Table check');
					this.database.executeSql('SELECT count(*) AS versionCount FROM app_versions WHERE version = ?', [this.appVersion], function(rs) {
						let versionCount = rs.rows.item(0).versionCount;
						if (versionCount === 0){
							this.isNotInitialized = true;
						}
						console.log('isInitialized: ' + !this.isNotInitialized);
						console.log('Count(expected 0 or 1): ' + versionCount);
						if (this.isNotInitialized){
							this.database.sqlBatch([
								[ 'INSERT INTO app_versions (version, description) VALUES (?,?)', [this.appVersion, this.appVersion] ],
								], function() {
								console.log('Version initialized');
							  }, function(error) {
								console.log('Version initialization ERROR: ' + error.message);
							});	
						}
					}.bind(this), function(error) {
						console.log('SELECT version ERROR: ' + error.message);
					});
				}.bind(this), function(error) {
					console.log('Table check ERROR: ' + error.message);
			});	
			
            this.isInstantiated = true;
        }
	}
	
}
