package com.fujifilm.gaia.dto
	

	
{% for item in doc.data -%}
"{$ item.key $}" : "{$ item.value $}",
 {% endfor -%}
