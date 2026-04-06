import importlib

# Ensure fpdf is installed
if not importlib.util.find_spec("fpdf"):
    import sys
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf2"])

from fpdf import FPDF

def create_rfp_pdf():
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", size=12)
    pdf.cell(200, 10, txt="RFP Requirements Document", ln=True, align='C')
    pdf.ln(10)
    pdf.multi_cell(0, 10, "1. The vendor must have ISO 27001 certification or equivalent security standards.\n"
                          "2. Must provide 24/7 technical support with a 1-hour SLA for critical issues.\n"
                          "3. Vendor must agree to Net 60 payment terms.\n"
                          "4. Data center must be located within the European Union.")
    pdf.output("demo_rfp.pdf")

def create_proposal_pdf():
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", size=12)
    pdf.cell(200, 10, txt="Vendor Proposal", ln=True, align='C')
    pdf.ln(10)
    pdf.multi_cell(0, 10, "We are pleased to submit our proposal for the tender.\n\n"
                          "Security is our top priority. We are ISO 27001 certified and undergo annual compliance audits.\n\n"
                          "Our support team is outstanding. Support is available during standard business hours with a 4-hour response time.\n\n"
                          "We agree to Net 45 payment terms, which is our standard.\n\n"
                          "For data compliance, all customer data is hosted in our Frankfurt, Germany data center.\n\n"
                          "Note: We reserve the right to change pricing with 30 days notice. Also, liability is capped at 12 months subscription fees.")
    pdf.output("demo_proposal.pdf")

if __name__ == "__main__":
    create_rfp_pdf()
    create_proposal_pdf()
    print("Created demo_rfp.pdf and demo_proposal.pdf")
