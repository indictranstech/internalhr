frappe.ui.form.on("Attendance","out_time",function(frm){
	if (frm.doc.in_time>frm.doc.out_time)
		frappe.msgprint("In time Must be smaller than out time")
		frm.doc.out_time="";
		refresh_field("out_time");
})


frappe.ui.form.on("Salary Structure","ctc",function(frm){
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
})
