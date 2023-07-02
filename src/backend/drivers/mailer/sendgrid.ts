import { env } from '$env/dynamic/private';
import type { IMailer } from '%b/core/context/mailer';
import sendgrid, { type MailDataRequired } from '@sendgrid/mail';

export class SendgridMailer implements IMailer {
  constructor() {
    sendgrid.setApiKey(env.SENDGRID_API_KEY);
  }

  async sendCode(to: string, values: { code: string }): Promise<void> {
    const msg: MailDataRequired = {
      to,
      from: env.MAILER_FROM,
      subject: '[TODO APP] Enter Verification Code',
      text: `Enter this code: ${values.code}`,
      html: `<strong>Enter this code: ${values.code}</strong>`,
    };
    await sendgrid.send(msg);
  }
}
