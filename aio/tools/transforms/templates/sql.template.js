insert into public.{$ doc.fileInfo.baseName $}({$ doc.keys $}) values 
{% for item in doc.data -%}
{% if  loop.first == false %} , {% endif %}({$ item $}){% if  loop.last %} ; {% endif %}
 {% endfor -%}
