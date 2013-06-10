connector = remote.connect('alfresco');
var resp = connector.get('/api/alvex/datalists/items?dlRef=workspace://SpacesStore/209e4350-5c48-4484-b663-1737b0c76822');

var items = eval('(' + resp + ')');

model.links = [];

for each (item in items)
{
	var link = {
		"text": item['contractor'],
		"address": item['name']
	};
	model.links.push(link);
}
