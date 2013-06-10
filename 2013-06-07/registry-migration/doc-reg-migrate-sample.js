/* This script should be run in JavaScript Console */

// Get site and container
var site = siteService.getSite('office');
var cont = site.getContainer('dataLists');

// Print titles for all registries
//for each( list in cont.children )
//  print( list.properties.title );

// Get source and destination registry
var srcList = cont.children[2];
var dstList = cont.children[1];

print( "Source: " + srcList.properties.title );
print( "Dest: " + dstList.properties.title );

// Copy everything from source into destination
for each( item in srcList.children )
{
	var node = dstList.createNode(null, "alvexcourse_docs:document_partner_agreement");
	for(prop in item.properties)
		node.properties[prop] = item.properties[prop];
	node.save();
}
