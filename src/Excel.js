import { useContext, useEffect } from "react";
import { Context } from "./Context";
import * as XLSX from "xlsx";

function Excel() {
  const { list } = useContext(Context);
  const tempList = JSON.parse(localStorage.getItem("items"));

  // To adapt the keys and values of the object to the Excel file
  useEffect(() => {
    if (tempList) {
      tempList.forEach((row) => {
        // gereksiz olabilir burası
        // let tempCurrency = row.currency;
        row.salary = `${row.salary}${row.currency}`;
        delete row.currency;
        delete row.id;
        row.applied = row.applied ? "applied" : "not applied yet";
        console.log(tempList);
      });
    }
  }, [list, tempList]);

  function downloadExcel(data) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  }

  return <button onClick={() => downloadExcel(tempList)}> Download</button>;
}

export default Excel;
