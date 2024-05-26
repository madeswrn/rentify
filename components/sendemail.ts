"use server"
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface UserDetails {
  firstname: string;
  email: string;
  phoneno: string;
}

const sendEmail = async (customerDetails: UserDetails[], ownerDetails: UserDetails[]) => {
  console.log("Customer",customerDetails)
  console.log("Seller",ownerDetails)
  try {
    
    const mailOptionForHouseSeller = {
      from: process.env.EMAIL_USER,
      to: customerDetails[0].email,
      subject: 'Rentify - Owner Details',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Owner Details</title>
          <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            color: #555;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
        }
        td {
            color: #333;
        }
        .footer {
            margin-top: 20px;
        }
        .order {
            display:flex;
            flex-direction:row;
        }
    </style>

      </head>
      <body>
          <div class="container">
              <h1 style="text-align:center;"><strong>Rentify Team</strong></h1>
              <h2>Contact Owner</h2>
              <p>Hello sir,</p>
              <p>Thank you for showing  interest , Here you can view the details of the owner below:</p>
             <div class="order">
             <p>name:</p>
             <p>${ownerDetails[0]?.firstname || 'N/A'}<p/>
             </div>
             <div class="order">
             <p>email</p>
             <p>${ownerDetails[0]?.email|| 'N/A'}<p/>
             </div>
             <div class="order">
             <p>phoneno</p>
             <p>${ownerDetails[0]?.phoneno || 'N/A'}<p/>
             </div>
          </div>
      </body>
      </html>
      `,
    };

    const mailOptionForHouseBuyer = {
      from: process.env.EMAIL_USER,
      to: ownerDetails[0].email,
      subject: 'Rentify - Customer Details',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Customer Details</title>
          <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            color: #555;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
        }
        td {
            color: #333;
        }
        .footer {
            margin-top: 20px;
        }
        .order {
            display:flex;
            flex-direction:row;
        }
    </style>

      </head>
      <body>
          <div class="container">
              <h1 style="text-align:center;"><strong>Rentify Team</strong></h1>
              <h2>Contact Owner</h2>
              <p>Hello,</p>
              <p>Thank you for showing  interest , Here you can view the details of the customer below:</p>
              <div class="order">
             <p>name:</p>
             <p>${customerDetails[0]?.firstname || 'N/A'}<p/>
             </div>
             <div class="order">
             <p>email</p>
             <p>${customerDetails[0]?.email || 'N/A'}<p/>
             </div>
             <div class="order">
             <p>phoneno</p>
             <p>${customerDetails[0]?.phoneno || 'N/A'}<p/>
             </div>
              <div class="footer">
                  <p>If you have any further questions, feel free to reach out to us.</p>
                  <p>Best Regards,</p>
                  <p>Rentify Team</p>
              </div>
          </div>
      </body>
      </html>
      `,
    };

    await transporter.sendMail(mailOptionForHouseSeller);
    await transporter.sendMail(mailOptionForHouseBuyer);

    return NextResponse.json(
      { message: 'Email Sent Successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to Send Email' },
      { status: 500 }
    );
  }
};

export default sendEmail;
