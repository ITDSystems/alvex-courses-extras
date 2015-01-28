MyCustomRenderer = function (elCell, oRecord, oColumn, oData)
{
   oData = oRecord.getData("itemData")[oColumn.field];
   if( !oData )
      return;

   if( oData.value >= 10 )
      elCell.innerHTML = "<strong>" + oData.displayValue + "</strong>";
   else
      elCell.innerHTML = oData.displayValue;
};
