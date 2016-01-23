# -*- coding: utf-8 -*-
# Copyright (c) 2015, New Indictrans and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from datetime import datetime
import time
from datetime import date
from frappe.utils import getdate
from frappe.utils import cint , flt


class PerformanceAppraisalForm(Document):
	def get_date(self):
		d1 = datetime.strptime(self.date_of_joining, "%Y-%m-%d")
		d2 = datetime.strptime(self.todays_date		, "%Y-%m-%d")
		diff = abs(((d2 - d1).days)/30)
		self.time_with_indictrans = diff
		# frappe.errprint(self.time_with_indictrans)

		desig = frappe.db.sql("select modified,designation from `tabEmployee` where name='%s'"%(self.employee_id))
		# frappe.errprint(desig[0][0])
		d = desig[0][0]
		date1 = d.strftime('%Y-%m-%d')
		
		# date2 = datetime.strptime(self.date,"%Y-%m-%d %H-%M-%S").date()
		date2 = getdate(self.todays_date)
		# date3 = datetime.strptime(date1, "%Y-%m-%d")
		diff1 = abs(((date2 - getdate(date1)).days)/30)
		self.time_in_current_position = diff1
		return {
			'diff': diff,
			'diff1': diff1
		}
		# frappe.errprint(diff1)

	def get_total(self):
		# total_rate=0.0
		# frappe.errprint(total_rate)
		total_rate=flt(self.r1)+flt(self.r2)+flt(self.r3)+flt(self.r4)+flt(self.rating)+flt(self.r6)+flt(self.r7)+flt(self.r8)+flt(self.r9)+flt(self.r10)+flt(self.r11)+flt(self.r12)
		self.total_rating = flt(total_rate)
		# frappe.errprint(total_rate)
		frappe.errprint(self.total_rating)
		return {
			'total_rate':total_rate
		}