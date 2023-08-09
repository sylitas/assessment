import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { getFileContent } from './aws-sdk';
import { MAIL_TEMPLATE } from '../utils/const';

// Create a transporter object using the Gmail SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_MAILER_MAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

const renderTemplate = async (templateCode, data) => {
  // Retrieve the template content from your storage or template library
  const templateContent = await getFileContent(`template/${templateCode}.html`);
  // Compile the template
  const compiledTemplate = handlebars.compile(templateContent);

  // Render the template with the provided data
  return compiledTemplate(data);
};

export const sendEmail = async (to, code, data) => {
  const templateCode = Object.keys(MAIL_TEMPLATE).find((tem) => tem === code);
  if (!templateCode) throw new Error('Not found template Code');
  const mailOptions = {
    from: process.env.MAIL,
    to,
    subject: MAIL_TEMPLATE[templateCode].subject,
    html: await renderTemplate(templateCode, data),
  };
  await transporter.sendMail(mailOptions);
};
