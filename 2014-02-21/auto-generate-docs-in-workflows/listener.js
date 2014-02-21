execution.setVariable('lwf_supplierName', task.getVariableLocal('lwf_supplierName'));
execution.setVariable('lwf_orderNumber', task.getVariableLocal('lwf_orderNumber'));

var orderNum = task.getVariableLocal('lwf_orderNumber');
var supplier = task.getVariableLocal('lwf_supplierName');
var sum = task.getVariableLocal('lwf_amount');

var templateFile = search.findNode( "workspace://SpacesStore/262981fb-e141-43bd-ac63-9b8199eb1077" );
var folder = userhome;

var name = "Счёт " + orderNum;
var data = jsonUtils.toJSONString( {"number": orderNum, "company": supplier, "amount": sum} );

var bill = template.generate( tempFile, folder, name, data );
bpm_package.addNode(search.findNode(bill.toString()));
