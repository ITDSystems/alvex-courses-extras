/* 
 * This script creates another JS script that adds users to groups on the fresh Alfresco like it's on the old Alfresco instance.
 * Example: you have groups A and B in Alfresco. There are User1 and User2 in A group, User3 is in B group. 
 * Execute the following code in JavaScript Console, then grab createGroups.js in the repository. 
 * On new Alfresco instance create users first (using http://alfrescoblog.com/2014/09/04/alfresco-export-users-from-one-server-to-the-other/ for example).
 * Then execute createGroups.js on the new Alfresco. It will add users User1 and User2 to group A and User3 to group B. 
 * Bonus: if you want also to create groups on the new Alfresco instance automatically, set flag "createIfNotExist" to true. If you want to create groups manually or by another tools, set this flag to false. In this case users will not be added to the groups that are not exist.
 */

var createIfNotExist = false;

var paging = utils.createPaging(-1, 0);
var groupCollection = groups.getGroups("", paging);

var output = "";
for (var i = 0; i < groupCollection.length; i++) {
    var group = groupCollection[i];
    var node = people.getGroup("GROUP_" + group.shortName);
    if (createIfNotExist == true) {
        output += ("var group = people.getGroup('GROUP_" + group.shortName + "');\n");
        output += ("if (!group) {\n");
        output += (" group = people.createGroup('" + group.shortName + "');\n");
        output += ("}\n");
    }
    var members = people.getMembers(node);
    if (members.length != 0) {
        output += ("var group = people.getGroup('GROUP_" + group.shortName + "');\n");
        output += ("if (group) {\n");
        output += (" var members = people.getMembers(group);\n");
        for (var j = 0; j < members.length; j++) {
            output += (" var isMember = false;\n");
            output += (" members.forEach(function(member) {\n");
            output += ("  if (member.properties['userName'] == '" + members[j].properties["cm:userName"] + "') {\n");
            output += ("   isMember = true;\n");
            output += ("  };\n");
            output += (" });\n");
            output += (" if (isMember == false) {\n");
            output += ("  var user = people.getPerson('" + members[j].properties["cm:userName"] + "');\n");
            output += ("  try {\n   people.addAuthority(group, user);\n  }\n  catch (ex)\n  {\n   print('ABORT: Exception occurred: '+ex);\n  }\n");
            output += (" }\n");
        }
        output += ("}\n");
    }
}

var article = companyhome.createNode("createGroups.js", "cm:content");
article.content = output;
article.save();
