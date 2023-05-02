import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { celebrate, Joi, errors, Segments } from 'celebrate'

import sgMail, { MailDataRequired } from '@sendgrid/mail'

const app = express()

dotenv.config({ path: '../.env' })

const port = process.env.BACKEND_PORT || 8080

app.use(cors())

app.use(express.json())

app.use(errors())

app.post(
  '/send-contact',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.string(),
      email: Joi.string().required(),
      question: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      sgMail.setApiKey(`${process.env.SENDGRID_KEY}`)

      const phoneText =
        req.body.phone && req.body.phone !== ''
          ? `Phone: ${req.body.phone}`
          : ''

      const email: MailDataRequired = {
        from: process.env.EMAIL_FROM ?? '',
        to: req.body.email,
        subject: `Contact Form Portfolio App - ${req.body.firstName} ${req.body.lastName}`,
        text: `${req.body.question} ${phoneText}`,
        html: `${req.body.question}<br/><br/>${phoneText}`,
      }

      await sgMail.send(email)

      res.status(201).send()
    } catch (error) {
      res.status(500).send()
    }
  }
)

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at ${process.env.REACT_APP_THIN_BACKEND_SERVER_URL}`
  )
})

export default app
