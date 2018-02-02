import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SqliteDBService {

    private isInstantiated: boolean;
	  private isNotInitialized: boolean = false;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();
    private appVersion: string = "1.0";

    public constructor() {
      console.log(`${Date.now()}:SqliteDBService: Constructor - ${window['_cordovaNative']}`);
      if(window['_cordovaNative']){
         document.addEventListener("deviceready", this.init.bind(this), false);
      }
    }

    init() {
      if(!this.isInstantiated) {
        console.log(`${Date.now()}:SqliteDBService: init - About to open DB`);
        this.database = (<any>window).sqlitePlugin.openDatabase({name: 'angular_playground.db', location: 'default'});
        console.log(`${Date.now()}:SqliteDBService: init - Opened DB`);

			  // Clean version
			  //this.database.sqlBatch(['DROP TABLE IF EXISTS app_versions',], function(){}, function(e){});

			  this.database.sqlBatch([
  				'CREATE TABLE IF NOT EXISTS app_versions (id INTEGER PRIMARY KEY, version TEXT UNIQUE, description TEXT)',
  				], function() {
  					this.database.executeSql('SELECT count(*) AS versionCount FROM app_versions WHERE version = ?', [this.appVersion], function(rs) {
  						let versionCount = rs.rows.item(0).versionCount;
  						if (versionCount === 0){
  							this.isNotInitialized = true;
  						}
  						if (this.isNotInitialized){
  							this.database.sqlBatch([
  								[ 'INSERT INTO app_versions (version, description) VALUES (?,?)', [this.appVersion, this.appVersion] ],
  								], function() {
  							  }, function(error) {
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
