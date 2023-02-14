export const selectedRow = function () {
    var index,
        table = document.getElementById("table");
    let indexSeleted = 0;

    for (var i = 1; i < table.rows.length; i++) {
       // table.rows[i].classList.remove("selected");
        table.rows[i].onclick = function () {
            // remove the background from the previous selected row
            if (typeof index !== "undefined") {
                table.rows[index].classList.toggle("selected");
            }
            // get the selected row index
            indexSeleted = this.rowIndex;
            clearRows(indexSeleted);
            // add class selected to the row
            //   this.classList.toggle("selected");

            console.log(this.classList.contains("selected"))
            let isSeleted=this.classList.contains("selected");

            if (isSeleted) {
                this.classList.remove("selected");
            } else {
                this.classList.toggle("selected");
            }
        };
        // if(indexSeleted!=i)
        // {
        //     table.rows[index].remove("selected");
        //   this.classList.remove("selected");
        // }
    }
}

export const clearRows = function (indexSeleted) {
    let table = document.getElementById("table");
    for (var i = 1; i < table.rows.length; i++) {
        if(i!=indexSeleted)
        {
            table.rows[i].classList.remove("selected");
        }      
    }
}