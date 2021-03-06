import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {SheetDataService} from '../../services/sheet-data.service.ts';
import {TxtFileDataService} from '../../services/txt-file-data.service.ts';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Control} from 'angular2/common';

@Component({
	selector: 'results-area',
	template: `
		<input type="text" [ngFormControl]="inputData" placeholder="type to search" style="margin-bottom: 25px; width: 100%; margin-left: 5px; font-size: 2.5vw; outline: none; border: none; background: none; color: rbga(255, 255, 255, .1)" autofocus>

		<div style="display: flex; flex-direction: row">
			<div *ngFor="#title of rowTitles" style="flex: 1; margin-left: 5px">
				<div [innerHTML]="title" style="color: grey; font-size: .75em"></div>
			</div>
		</div>

		<div *ngFor="#value of rowValues" style="background-color: white; padding: 20px; box-shadow: 0px 0px 1px grey; margin-top: 10px; margin-bottom: 10px; cursor: pointer" (click)="rowClick(value)">
			<div style="display: flex; flex-direction: row">
				<div *ngFor="#title of rowTitles" [innerHTML]="value[title]" style="flex: 1"></div>
			</div>
		</div>
    `
})

export class ResultsAreaComponent {

	public rowTitles;
	public rowValues;
	public inputData: Control;

	private allValues;
	private savedRowValues;
	private router: Router;
	private sheetDataService: SheetDataService;

	constructor(sheetDataService: SheetDataService, txtFileDataService: TxtFileDataService, router: Router) {

		this.router = router;
		this.sheetDataService = sheetDataService;
		this.inputData = new Control();

		txtFileDataService.loadSpreadsheetUrl().subscribe(async (data) => {
			this.allValues = await sheetDataService.getAllValues(data);
			this.rowValues = sheetDataService.getRowValues(this.allValues);
			this.savedRowValues = sheetDataService.getRowValues(this.allValues);
			this.rowTitles = Object.keys(this.rowValues[0]).filter(function(element) {
				return element !== 'origIndex';
			});
		});

		this.observeSearchInputData();
	}

	observeSearchInputData() {
		this.inputData.valueChanges.debounceTime(400).distinctUntilChanged().subscribe((inputString) => {
			this.sheetDataService.searchForInputString(inputString, this.savedRowValues).subscribe((values) => {
				this.rowValues = values;
			});
		});
	}

	rowClick(value) {
		this.router.navigate([
			'Detail', {
				items: this.sheetDataService.prepareValuesForUrl(this.allValues[value.origIndex])
			}
		]);
	}

}
