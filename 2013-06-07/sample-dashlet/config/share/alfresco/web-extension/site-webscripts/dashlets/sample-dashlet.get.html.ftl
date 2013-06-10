<div class="dashlet workflow-shortcuts">
	<div class="title">${msg("sample.header")}</div>
	<div class="body scrollableList">
		<#list links as link>
		<div>
			<a href="${link.address}">${link.text}</a>
		</div>
		</#list>
	</div>
</div>
