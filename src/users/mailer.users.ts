import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "idoelishar81@gmail.com",
            pass: process.env.PASMAIL
        }
    });
    const mailOptions = {
        from: 'idoelishar81@gmail.com',
        to: email,
        subject: '✅ Your registration on Rhythm Builder was successful',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; background-color: #fafafa;">
            <h2 style="color: #2c3e50; text-align: center;">Welcome to Rhythm Builder!</h2>
            
            <p style="font-size: 16px; color: #333;">
              Hello <strong>${email}</strong>,
            </p>
      
            <p style="font-size: 15px; color: #555;">
              You have successfully registered on <strong>Rhythm Builder</strong> 🎶  
              We're excited to have you on board!  
              Explore new musical experiences and start creating your own rhythms today.
            </p>
      
            <div style="margin: 20px 0; text-align: center;">
              <a href="http://localhost:5173/" 
                 style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                Log in now
              </a>
            </div>
      
            <p style="font-size: 14px; color: #888; text-align: center;">
              If you did not sign up, please ignore this email.
            </p>
          </div>
        `
    };


    await transporter.sendMail(mailOptions);
};
