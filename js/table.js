/*
File: styles.css
Purpose: Provide dynamic multiplicative table generation for index.html. Basing on the user input in html forms.  
Author: Jen Yuan Shih (JenYuan_Shih@student.uml.edu)
Last Updated: 10/25/2021 3:48PM EST
*/

/**
 * init function will be listen for when the submit button is clicked, 
 * which will call the generateTable function.
 */
const init = function(){
    document.getElementById('submit_button').addEventListener('click', generateTable);
}

/**
 * generateTable function will read the input from the form when the 
 * submit button is clicked. Perform validation to see if the input by 
 * user is valid for multiplicative table generation. If valid, 
 * generate table. 
 */
const generateTable = function(){
    let colMin = document.getElementById('col-min').value;
    let colMax = document.getElementById('col-max').value;
    let rowMin = document.getElementById('row-min').value;
    let rowMax = document.getElementById('row-max').value;

    var ret = isInputValid(colMin, colMax, rowMin, rowMax);

    document.getElementById("tableWrapper").innerHTML = ("");

    var tableDiv = document.getElementById("tableWrapper")
    var tbl = document.createElement("table");
    if(ret){
        var finalTable = makeTable(Number(colMin), Number(colMax), Number(rowMin), Number(rowMax));
        tbl.appendChild(finalTable);
        tableDiv.appendChild(tbl);
    }
    document.getElementById('tableForm').reset();
}

/**
 * validation function, taking in the four inputs by the user and 
 * perform validation to see if the input is valid for multiplicative 
 * table generation. If inputs is invalid, table will not be generated 
 * and an error message will be displayed. The function check for:
 * 1. If the inputs field is empty
 * 2. If the inputs is a valid integer
 * 3. If the min inputs is smaller than the max inputs
 * 4. If the inputs is between -50 to 50
 * 
 * @param {integer} col_min column minimum
 * @param {integer} col_max column maximum
 * @param {integer} row_min column minimum
 * @param {integer} row_max column maximum
 * @returns boolean to see if the input is valid
 */
const isInputValid = function(col_min, col_max, row_min, row_max){
    var vali = true
    if(col_min == "" || col_max == "" || row_min == "" || row_max == ""){
        document.getElementById("error_msg").innerHTML = ("Missing Input(s)");
        return false
    }
    cMin = Number(col_min);
    cMax = Number(col_max);
    rMin = Number(row_min);
    rMax = Number(row_max);
    if(!Number.isInteger(cMin) || !Number.isInteger(cMax) || !Number.isInteger(rMin) || !Number.isInteger(rMax)){
        document.getElementById("error_msg").innerHTML = ("Invalid Input(s)");
        vali = false;
    }
    else if(cMin>cMax || rMin > rMax){
        document.getElementById("error_msg").innerHTML = ("Min Value is Larger than Max Value");
        vali = false;
    }
    else if(cMin>50 || cMax>50 || rMin > 50 || rMax > 50){
        document.getElementById("error_msg").innerHTML = ("Enter Value between -50 to 50");
        vali = false;
    }
    else if(cMin<-50 || cMax<-50 || rMin < -50 || rMax < -50){
        document.getElementById("error_msg").innerHTML = ("Enter Value between -50 to 50");
        vali = false;
    }

    if(vali){
        document.getElementById("error_msg").innerHTML = ("");
    }

    return vali;
}

/**
 * Helper function to generate multiplicative table. Creating an HTML
 * table object size of ((c_max-c_min)*(r_max-r_min))
 * @param {*} c_min column minimum
 * @param {*} c_max column maximum
 * @param {*} r_min column minimum
 * @param {*} r_max column maximum
 * @returns HTMLTableSelectionElement that holds the dynamic 
 * multiplicative table 
 */
const makeTable = function(c_min, c_max, r_min, r_max){
    var tblBody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    headRow.appendChild(document.createElement("td"));
    for(var hr = c_min; hr <= c_max; hr++){
        var headRowCell = document.createElement("td");
        headRowCell.classList.add("headerCell");
        headRowCell.appendChild(document.createTextNode(hr))
        headRow.appendChild(headRowCell);
    }
    tblBody.appendChild(headRow);
    for(var r = r_min; r <= r_max; r++){
        var row = document.createElement("tr");
        var headColCell = document.createElement("td");
        headColCell.appendChild(document.createTextNode(r));
        headColCell.classList.add("headerCell");
        row.appendChild(headColCell);
        for(var c = c_min; c<=c_max; c++){
            var cell = document.createElement("td");
            if(c%2==0 && r%2==0){
                cell.classList.add("greyCell");
            }
            else if((c%2==1 || c%2==-1) && (r%2==1 || r%2==-1)){
                cell.classList.add("greyCell");
            }
            var cellContent = document.createTextNode(r*c);

            cell.appendChild(cellContent);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    return tblBody;
}

/**
 * DOMContentLoaded events will be triggered when the initial HTML 
 * document has been loaded completed, starting the init function.
 */
document.addEventListener('DOMContentLoaded', init);