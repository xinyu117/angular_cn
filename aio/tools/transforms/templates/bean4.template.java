
	

{% for item in doc.data -%}
 /** {$ item.comment $} */
info.set{$ item.property | toPascalCase $}(e.get{$ item.property | toPascalCase $}());
 {% endfor -%}
 
