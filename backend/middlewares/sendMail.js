import nodemailer from "nodemailer";

export const sendMail = async (data) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.verify();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: data.subject,
      text: data.message
    };

  await transporter.sendMail(mailOptions);

  

    return true;

  } catch (error) {
  
     res.status(500).json({
      success: false,
      message: "SMTP error"
    });
  }
};