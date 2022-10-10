
public class {$ doc.className $} {
	
{% for item in doc.data -%}
      /** {$ item.comment $} */
    private {$ item.type  $} {$ item.property $};
 {% endfor -%}
 
{% for item in doc.data -%}
      /**  Get {$ item.comment $} */
    public {$ item.type  $} get{$ item.property | toPascalCase $}() {
        return this.{$ item.property $};
    }
      /**  Set {$ item.comment $} */
    public void set{$ item.property | toPascalCase $}({$ item.type  $} {$ item.property $}) {
        this.{$ item.property $} = {$ item.property $};
    }
{% if  loop.last %} } {% endif %}
  {% endfor -%}