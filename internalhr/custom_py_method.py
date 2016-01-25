from __future__ import unicode_literals
import frappe
from frappe import _
def notify_leave_Manager(doc,method):
	if (not doc.previous_doc) or (doc.previous_doc and \
				doc.status == "Open" and doc.previous_doc.leave_approver != doc.leave_approver):
		manager_list=frappe.db.sql("select cc_name from tabCC where parent = '%s'"%(doc.employee), as_list=1)
		if manager_list:
			for email_id in manager_list:
				subj=_("New Leave Application")
				messages = ("New leave Application:{0} from Employee:{1}").format(doc.name,doc.employee_name)
				frappe.sendmail(email_id[0],subject=subj,message=messages)
			