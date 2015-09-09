# Custom Workflow Sample

Find description of the workflow [in our blog](http://blog.itdhq.com/post/128650897745/custom-workflow-sample)

## Prerequisites

* Alfresco 4.2.4 / 4.2.f with installed Alvex Enterprise 2.1.3 on top of it. Alvex should be installed as AMP (not JAR).
* Org Chart should be created in Admin Console or using API. Create a role “CEO” and attach it to the top branch of the org chart. Select a user who has this role.
* Site with created document register to store contracts (type: alvexdt:agreement). User with “CEO” role and initiator of the workflow should have RW permissions to the register.
* Attach external master data source to Alvex and name it “Contractors”. For example, you can use http://www.alvexsoftware.com/files/sample.json. Attach master data to the document register.
