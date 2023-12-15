import { useContext } from "react";
import { Context } from "./Context";
import * as XLSX from "xlsx";

function Excel() {
  const { list } = useContext(Context);

  function downloadExcel(data) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  }

  return <button onClick={() => downloadExcel(list)}> Download</button>;
}

export default Excel;
