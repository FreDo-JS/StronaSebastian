import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3001

// app.use(cors({ origin: process.env.FRONTEND_URL || 'https://api.juniordevops.xyz' }))
app.use(cors({
  origin: ['https://juniordevops.xyz', 'https://www.juniordevops.xyz'],
  methods: ['POST', 'GET', 'OPTIONS'],
}));
app.use(express.json())

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

app.post('/api/contact', async (req, res) => {
  const { name, company, email, phone, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Brak wymaganych pól.' })
  }

  try {
    await transporter.sendMail({
      from: `"Formularz kontaktowy" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Nowe zapytanie od ${name}`,
      text: [
        `Imię i nazwisko: ${name}`,
        `Firma: ${company || '—'}`,
        `E-mail: ${email}`,
        `Telefon: ${phone || '—'}`,
        ``,
        `Wiadomość:`,
        message,
      ].join('\n'),
      html: `
        <table style="font-family:sans-serif;font-size:15px;color:#1A1816;max-width:600px">
          <tr><td><strong>Imię i nazwisko:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Firma:</strong></td><td>${company || '—'}</td></tr>
          <tr><td><strong>E-mail:</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Telefon:</strong></td><td>${phone || '—'}</td></tr>
        </table>
        <br>
        <p style="font-family:sans-serif;font-size:15px;color:#1A1816"><strong>Wiadomość:</strong></p>
        <p style="font-family:sans-serif;font-size:15px;color:#1A1816;white-space:pre-wrap">${message}</p>
      `,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Błąd serwera. Spróbuj ponownie.' })
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
