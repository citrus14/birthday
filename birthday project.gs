function onOpen(){

  var ss = SpreadsheetApp.getActiveSpreadsheet();
 
  var subMenus = []; //show custom
  subMenus.push({
    name: "コミット",
    functionName: "createSchedule"  // specify a function
  });
  ss.addMenu("アプリ同期", subMenus);

}

function createSchedule() {
 
  const gAccount = "**********@gmail.com";
  
  // reading range
  const topRow = 3;
  const lastCol = 5;
 
  // define columns
  const statusCellNum = 0;
  const dayCellNum = 1;
  const titleCellNum = 2;
  const descriptionCellNum = 3;
 
  // get sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var lastRow = sheet.getLastRow();
  
  // get table
  var contents = sheet.getRange(topRow, 2, lastRow, lastCol).getValues();

  Logger.log("SET : table");
 
  // reading google-calendar
  var calender = CalendarApp.getCalendarById(gAccount);
 
  for (i = 0; i <= lastRow - topRow; i++) {
 
    var status = contents[i][statusCellNum];

    if(status == ("Reflected")){
      continue;
    }

    // set date,description
    var day = new Date(contents[i][dayCellNum]);
    var title = contents[i][titleCellNum];
    var description = contents[i][descriptionCellNum];
    
    try {
      const birthday = calender.createAllDayEventSeries(
        title +" 's birthday!!",
        new Date(day),
        CalendarApp.newRecurrence().addYearlyRule(),
        description
      );

      sheet.getRange(topRow + i, 2).setValue("Reflected");

      birthday.setColor(CalendarApp.EventColor.BLUE);

    }
    catch(e) {
      Logger.log(e);
    }
    Logger.log("ACCEPT : roop");
  }

  // notify completion
  Browser.msgBox("動作が終了しました");
}

//