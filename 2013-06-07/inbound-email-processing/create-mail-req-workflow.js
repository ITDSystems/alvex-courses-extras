// Starts workflow for given group
function startWorkflow(group)
{
	// Get workflow definition
	var workflowDefinition = workflow.getDefinitionByName("activiti$vtcMailRequestWorkflow");
	
	// Create document package for this workflow
	var workflowPackage = workflow.createPackage();
	
	// If email has attachments - attach them to workflow
	if(document.assocs.attachments != undefined)
		for each (attach in document.assocs.attachments)
			workflowPackage.addNode( attach );
	
	// Fill major workflow parameters based on data from email
	var workflowParameters = new Array();
	workflowParameters["bpm:workflowDescription"] = "New request: " + document.properties.subjectline;
	workflowParameters["bpm:groupAssignee"] = group;
	workflowParameters["myCompany:initiator"] = document.properties.originator;
	workflowParameters["myCompany:requestText"] = document.content;
	
	// Start workflow
	var workflowPath = workflowDefinition.startWorkflow(workflowPackage, workflowParameters);
	
	// Auto-complete initial workflow start task
	var tasks = workflowPath.getTasks();
	for (task in tasks)
		tasks[task].endTask(null);
}

// Main function
function main()
{
	// Process only email, skip other documents
	if( ! document.hasAspect('cm:emailed') )
		return;

	// Get parameters
	var name = document.name;
	var addressee = document.properties.addressee.replace(/@.*/,'');

	// Make sure the group exists
	var group = people.getGroup('GROUP_' + addressee);
	if (group != null)
	{
		// Create separate folder for this email
		var date = new Date();
		var folder = document.parent.createFolder(date.getTime());
		// Move email into this folder
		document.move(folder);
		// Move all attachments
		if(document.assocs.attachments != undefined)
			for each (attach in document.assocs.attachments)
				attach.move(folder);
		// Start workflow to process this email
		startWorkflow(group);
	}
}

main();
