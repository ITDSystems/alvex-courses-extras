/* This script is meant to be run in JavaScript Console */

// We will not drop configuration for these users
var usersToIgnore = ['admin', 'crazyEd'];

// Get dashboard configs for all users
for each (var node in companyhome.childrenByXPath('st:sites/cm:surf-config/cm:pages/cm:user/*') )
{
	// Get name of current user
	var username = String(node.name);
	// If the user is not in ignore list
	if (usersToIgnore.indexOf(username) == -1)
	{
		print("Dropping configuration for " + username);
		// Drop configuration completely for this user
		node.remove();
		for each (var _node in companyhome.childrenByXPath('st:sites/cm:surf-config/cm:components//.'))
			if (_node.name.indexOf('user~'+username+'~dashboard.xml') != -1)
				_node.remove();
	}
}
