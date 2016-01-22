# sheets-webpage

This repository will allow you to quickly publish a website that cleanly displays data from a Google Form.

## Setup Instructions
* Sign up for a GitHub account
* Fork this repository (click the Fork button on the [repository homepage](https://github.com/lastmj/sheets-webpage))

You now own a copy of the repository code, and you should have a live website up at yourgithubusername.github.io/sheets-webpage

The only thing left to do is hook up the Google Sheet that contains the Google Form data you would like to display.
* Make sure to [publish your Google Sheet to the web](https://support.google.com/docs/answer/37579?hl=en)
* Edit the file "sheets-url.txt" in your newly created repo, and completely replace the contents of the file with your public Google Sheet url
* To change the logo title of your webpage, edit the "page-title.txt" file in your newly created repo

## Displaying Data in Rows

Your data will not display properly in rows on the homepage until you choose which columns from your Google Sheet to include. To include a column, wrap the column value in [], i.e. [Name], [Date of Birth], [Status]. Now the rows on your homepage will display the data for the Name, Date of Birth, and Status columns.
