import frappe
def notify_leave_Manager(doc,method):
	manager_list=frappe.db.sql("select cc_name from tabCC where parent = '%s'"%(doc.employee), as_list=1)
	for email_id in manager_list:
		subj=_("New Leave Application")
		messages = ("New leave Application:{0} from Employee:{1}").format(doc.name,doc.employee_name)
		frappe.sendmail(email_id[0],subject=subj,message=messages)
		