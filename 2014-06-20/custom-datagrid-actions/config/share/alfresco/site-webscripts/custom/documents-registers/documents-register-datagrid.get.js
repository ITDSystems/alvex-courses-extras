model.actionSet.push(
{
   className: "onActionPermissions",
   type: "action-link",
   permission: "edit",
   href: "manage-permissions?nodeRef=",
   func: "",
   label: "actions.document.manage-permissions"
});

model.actionSet.push(
{
   className: "onActionComplete",
   type: "action-link",
   permission: "edit",
   href: "",
   func: "MyCustomAction",
   label: "actions.document.simple-approve"
});
