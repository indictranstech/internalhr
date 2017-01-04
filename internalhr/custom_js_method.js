frappe.ui.form.on("Attendance","out_time",function(frm){
	if (frm.doc.in_time>frm.doc.out_time)
		frappe.msgprint("In time Must be smaller than out time")
		frm.doc.out_time="";
		refresh_field("out_time");
})


/*frappe.ui.form.on("Salary Structure","ctc",function(frm){
	doc=frm.doc;
	  var gross=doc.ctc;
	  var cl=doc.earnings ||[];

	  for(var i = 0; i < cl.length; i++){
	      if(cl[i].e_type=='Basic') cl[i].modified_value = gross*0.38;
	      if(cl[i].e_type=='House Rent Allowance') cl[i].modified_value = gross*0.266;
	      if(cl[i].e_type=='Medical Allowance') cl[i].modified_value = gross*0.076;
	      if(cl[i].e_type=='Convayance Allowance') cl[i].modified_value=gross*0.076;
	      if(cl[i].e_type=='Lunch Allowance') cl[i].modified_value=gross*0.06;
	      if(cl[i].e_type=='Others') cl[i].modified_value = gross*0.142;
	  }
	  refresh_field('earnings');

	  var cll=doc.deductions ||[];

	  // var cll = getchildren('Salary Structure Deduction', doc.name, 'deduction_details', doc.doctype);
	  for(var i = 0; i < cll.length; i++){

	      if(cll[i].d_type=='Professional Tax'){
	        if(gross<15000) cll[i].d_modified_amt =175;
	        else cll[i].d_modified_amt = 200;
	      } 
	  }
	  refresh_field('deductions');
})*/
frappe.ui.form.on("Salary Structure","ctc",function(frm){
	doc=frm.doc;
	  var gross=doc.ctc;
	  var cl=doc.earnings ||[];

	  for(var i = 0; i < cl.length; i++){
	      
	      if(gross>=7000 && gross<=10000)
	      {
		  	if(cl[i].e_type=='Basic') cl[i].modified_value = gross*0.8;
		    if(cl[i].e_type=='House Rent Allowance') Math.round(cl[i].modified_value = gross-(gross*0.8));
		  }
		  else if(gross>=10000 && gross<=15000)
		  {
		  	if(cl[i].e_type=='Basic') cl[i].modified_value = 9000;
		  	if(cl[i].e_type=='Convayance Allowance') Math.round(cl[i].modified_value=(gross-9000)/2);
		    if(cl[i].e_type=='House Rent Allowance') Math.round(cl[i].modified_value =(gross-9000)/2);
		  }
		  else if(gross>15000 && gross<=25000)
		  {
		  	if(cl[i].e_type=='Basic') cl[i].modified_value = 9500;
		  	if(cl[i].e_type=='Convayance Allowance') Math.round(cl[i].modified_value=(gross-9500)/3);
		    if(cl[i].e_type=='House Rent Allowance') Math.round(cl[i].modified_value = (gross-9500)/3);
		    if(cl[i].e_type=='Medical Allowance') Math.round(cl[i].modified_value = (gross-9500)/3);
		  }
		  else
		  {
		  	if(cl[i].e_type=='Basic') cl[i].modified_value = Math.round(gross*0.4);
		  	if(cl[i].e_type=='House Rent Allowance') cl[i].modified_value = Math.round((gross*0.4)*30/100);
		  	if(cl[i].e_type=='Convayance Allowance') cl[i].modified_value=Math.round((gross*0.4)*25/100);
		    if(cl[i].e_type=='Medical Allowance')cl[i].modified_value = Math.round((gross*0.4)*20/100);
		    if(cl[i].e_type=='CCA') cl[i].modified_value = Math.round((gross*0.4)*20/100);
		    if(cl[i].e_type=='Welfare Allowance') cl[i].modified_value = Math.round((gross*0.4)*20/100);
		    if(cl[i].e_type=='Education Allowance') cl[i].modified_value = Math.round((gross*0.4)*20/100);
		    if(cl[i].e_type=='Entertainment Allowance') cl[i].modified_value = Math.round((gross*0.4)*15/100);
		  }
	  }
	  refresh_field('earnings');

	  var cll=doc.deductions ||[];

	  // var cll = getchildren('Salary Structure Deduction', doc.name, 'deduction_details', doc.doctype);
	  for(var i = 0; i < cll.length; i++){
	  	if(doc.employee_name=='Aniruddha Satam' || doc.employee_name=='Kalpita Sanghavi')
	  	{
			if(cll[i].d_type=='Provident Fund')cll[i].d_modified_amt=1800;
		}
		else
		{
			if (gross>=7000 && gross<=10000)
		  	{
		  		if(cll[i].d_type=='Provident Fund')
		  			cll[i].d_modified_amt=Math.round((gross*0.8)*0.12);
		  	}
		  	else if (gross>=10000 && gross<=15000)
		  	{
		  		if(cll[i].d_type=='Provident Fund')
		  			cll[i].d_modified_amt=Math.round(9000*0.12);
		  	}
		  	else if (gross>15000 && gross<=25000)
		  	{
		  		if(cll[i].d_type=='Provident Fund')cll[i].d_modified_amt=Math.round(9500*0.12);
		  	}
		  	else
		  	{
		  		if(cll[i].d_type=='Provident Fund')
		  		{
		  				(cll[i].d_modified_amt)=Math.round((gross*0.4)*0.12);
		  		}
		  	}
		}
	  	/*
		else
			if(cll[i].d_type=='Provident Fund')cll[i].d_modified_amt=gross*0.4*12/100;*/
	    if(doc.gender=='Female' && gross>10000)
	    {
	    	if(cll[i].d_type=='Professional Tax'){
	    	cll[i].d_modified_amt = 200;
	    }
	    }
	    else
	    {
		    if(gross>7000) 
		    {
		    	if(cll[i].d_type=='Professional Tax'){
		        	if(gross<15000) cll[i].d_modified_amt =175;
		        	else cll[i].d_modified_amt = 200;
		    	}
		    }
	     }
	  /*    if(cll[i].d_type=='ESIC')
	        cll[i].d_modified_amt=gross*0.0475;*/
	        /*if(gross<7000) */
	        	/*prof_tax=cl[i]*0.1336;
	        	console.log(prof_tax)*/
	        	/*esi=gross*0.0475*/
	        	/*cll[i].d_modified_amt =prof_tax;*/
	        	/*cll[i].d_modified_amt =esi;*/
	        /*else cll[i].d_modified_amt = 200;*/
	      
	  }
	  refresh_field('deductions');

})
cur_frm.add_fetch("employee", "gender", "gender");
