import nodemailer from 'nodemailer';

const sendOrderEmail = async (order, user) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const itemsHtml = order.items.map(item =>
    `<li>${item.name} (${item.size}) × ${item.qty} = ₹${item.price * item.qty}</li>`
  ).join('');

  const html = `
    <h1>Thank You ${user.name}!</h1>
    <p>Your order has been placed successfully.</p>
    <h3>Order ID: ${order._id}</h3>
    <p>Date: ${new Date(order.createdAt).toLocaleString()}</p>
    <h3>Items:</h3><ul>${itemsHtml}</ul>
    <h2>Total: ₹${order.totalPrice}</h2>
    <p>We'll ship it soon!</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Order Confirmed - #${order._id}`,
    html
  });
};

export default sendOrderEmail;