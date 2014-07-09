MyCustomAction = function(item)
{
   var targetProp = "prop_alvexdt_signingDate";
   var now = Alfresco.util.toISO8601(new Date());
   var formprocessorURL = Alfresco.constants.PROXY_URI + "api/node/" + Alfresco.util.NodeRef(item.nodeRef).uri + "/formprocessor";
   var postBody = {};
   postBody[targetProp] = now;
   Alfresco.util.Ajax.jsonPost(
   {
      url: formprocessorURL,
      dataObj: postBody,
      successCallback:
      {
         fn: function(resp)
         {
            item.itemData[targetProp] = {};
            item.itemData[targetProp].value = item.itemData[targetProp].displayValue = now;
            YAHOO.Bubbling.fire("dataItemUpdated",
            {
               item: item
            });
         },
         scope: this
      }
   });
};

