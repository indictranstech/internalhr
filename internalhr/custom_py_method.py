from __future__ import unicode_literals
import frappe
from frappe import _
def notify_leave_Manager(doc,method):
	if (not doc.previous_doc) or (doc.previous_doc and \
				doc.status == "Open" and doc.previous_doc.leave_approver != doc.leave_approver):
		manager_list=frappe.db.sql("select cc_name from tabCC where parent = '%s'"%(doc.employee), as_list=1)
		subj=_("New Leave Application")
		messages = ("New leave Application:{0} from Employee:{1} From:{2} To:{3}").format(doc.name,doc.employee_name,doc.from_date,doc.to_date)
		if manager_list:
			for email_id in manager_list:
				frappe.sendmail(email_id[0],subject=subj,message=messages)
		frappe.sendmail(doc.leave_approver,subject=subj,message=messages)
# def notify_leave_approv(doc,method):
# 	if (not doc.previous_doc) or (doc.previous_doc and \
# 				doc.status == "Open" and doc.previous_doc.leave_approver != doc.leave_approver):
# 		manager_list=frappe.db.sql("select leave_approver from `tabLeave Application` where employee_name  = '%s'"%(doc.employee), as_list=1)
# 		if manager_list:
# 			for email_id in manager_list:
# 				subj=_("New Leave Application")
# 				messages = ("New leave Application:{0} from Employee:{1} From:{2} To:{3}").format(doc.name,doc.employee_name,doc.from_date,doc.to_date)
# 				frappe.sendmail(email_id[0],subject=subj,message=messages)
				