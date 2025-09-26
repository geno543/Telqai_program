# EmailJS Setup Guide for Contact Form

## Overview
The contact form is now configured to use EmailJS to send emails directly to **telqAI@stemcsclub.org**.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service
1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect the **telqAI@stemcsclub.org** account
5. Note down the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Templates

#### Template 1: Contact Form (template_ru6p4jj)
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Set up the template with these variables:
   - `{{from_name}}` - Sender's name (firstName + lastName)
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{interest}}` - Contact type (student/parent/teacher)
   - `{{phone}}` - Phone number (optional)

#### Template 2: Application Confirmation (template_application_confirmation)
1. Create another new template for application confirmations
2. Set up the template with these variables:
   - `{{to_name}}` - Applicant's full name
   - `{{to_email}}` - Applicant's email
   - `{{applicant_name}}` - Applicant's full name
   - `{{country}}` - Applicant's country
   - `{{grade}}` - Applicant's grade/education level
   - `{{school}}` - Applicant's school
   - `{{application_date}}` - Date of application
   - `{{program_name}}` - Program name (TelqAI Program)

### 4. Template Examples

#### Contact Form Template
```
Subject: New Contact Form Submission from {{from_name}}

Hello,

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Contact Type: {{interest}}

Message:
{{message}}

Best regards,
Website Contact Form
```

#### Application Confirmation Template
```
Subject: Application Received - {{program_name}}

Dear {{to_name}},

Thank you for applying to the {{program_name}}! We have successfully received your application submitted on {{application_date}}.

Application Details:
- Name: {{applicant_name}}
- Country: {{country}}
- Education Level: {{grade}}
- School: {{school}}

What happens next?
• Review period: 3-5 business days
• Our admissions committee will carefully evaluate your application
• Selected candidates will be contacted for next steps
• Program starts soon - stay tuned!

Please check your email regularly (including spam folder) for updates. If you have any questions, feel free to contact us at telqAI@stemcsclub.org.

We appreciate your interest in advancing AI education in the MENA region!

Best regards,
The TelqAI Team
STEM Computer Science Club

---
This is an automated confirmation email. Please do not reply to this email.
```

### 5. Get Configuration Values
1. **Service ID**: From the Email Services section
2. **Template ID**: From the Email Templates section (Settings tab)
3. **Public Key**: From Account section in dashboard

### 6. Update the Code
Replace the placeholder values in `src/components/Contact.tsx`:

```typescript
const result = await emailjs.sendForm(
  'YOUR_SERVICE_ID',     // Replace with actual service ID
  'YOUR_TEMPLATE_ID',    // Replace with actual template ID
  form.current!,
  'YOUR_PUBLIC_KEY'      // Replace with actual public key
);
```

### 7. Environment Variables (Recommended)
Create a `.env` file in the project root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then update the code to use environment variables:

```typescript
const result = await emailjs.sendForm(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  form.current!,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);
```

## Testing
1. Fill out the contact form on your website
2. Submit the form
3. Check the **telqAI@stemcsclub.org** inbox
4. If no email arrives, check the spam folder

## Troubleshooting
- Ensure all IDs are correct
- Check browser console for error messages
- Verify EmailJS service is properly connected
- Make sure the email template variables match form field names

## Form Field Mapping
- `firstName` + `lastName` → `{{from_name}}`
- `email` → `{{from_email}}`
- `phone` → `{{phone}}`
- `message` → `{{message}}`
- `interest` → `{{interest}}`