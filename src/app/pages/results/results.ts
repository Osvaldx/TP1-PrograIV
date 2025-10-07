import { Component } from '@angular/core';
import { TablesDB } from '../../services/tables-db';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.css'
})
export class Results {

  constructor(private tableDB: TablesDB) {
    this.getData();
  }

  public async getData() {
    const data = await this.tableDB.getDataOfTable();
    console.log(data[0]);
  }
  
}
