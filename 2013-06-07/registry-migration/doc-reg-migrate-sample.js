/* This script should be run in JavaScript Console */

// Get site and container
var site = siteService.getSite('office');
var cont = site.getContainer('dataLists');

// Print titles for all registries
//for each( list in cont.children )
//  print( list.properties.title );

// Get source and destination registry

var resultsList = search.luceneSearch('PARENT:"' + cont.nodeRef + '" AND @cm\:name:"Title of the source list"');
var srcList = resultsList[0];
var resultsList = search.luceneSearch('PARENT:"' + cont.nodeRef + '" AND @cm\:name:"Title of the destination list"');
var dstList = resultsList[0];
 
print( "Source: " + srcList.properties.title );
print( "Dest: " + dstList.properties.title );

// Copy everything from source into destination
for each( item in srcList.children )
{
	var node = dstList.createNode(null, "alvexcourse_docs:document_partner_agreement");
	for (assoc in item.assocs)
		for each(i in item.assocs[assoc])
			node.createAssociation(i, assoc );
	for(prop in item.properties)
		node.properties[prop] = item.properties[prop];
	node.save();
}
