cur_frm.cscript.onload = function(doc, dt, dn) {
 from_date_and_to_date_of_appraisal_period(doc,dt,dn)
}
 from_date_and_to_date_of_appraisal_period = function(doc, dt, dn) {
  var fiscal_year=doc.fiscal_year
  var res = fiscal_year.split("-");
  doc.appraisal_period_from = res[0]+"-06-01";
  doc.appraisal_period_to = res[1]+"-05-31";	
}

cur_frm.add_fetch('employee_id', 'date_of_joining', 'date_of_joining');
cur_frm.add_fetch('employee_id', 'designation', 'designation');
cur_frm.add_fetch('employee_id', 'employee_name', 'employee_name');
