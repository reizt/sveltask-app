import type { IMailer } from '#/server/context/mailer';
import { env } from '$env/dynamic/private';
import sendgrid, { type MailDataRequired } from '@sendgrid/mail';

export class SendgridMailer implements IMailer {
  constructor(apiKey: string) {
    sendgrid.setApiKey(apiKey);
  }

  async sendCode(to: string, values: { code: string }): Promise<void> {
    const msg: MailDataRequired = {
      to,
      from: env.MAILER_FROM,
      subject: '[TODO APP] Enter Verification Code',
      text: `Enter this code: ${values.code}`,
      html: `Enter this code: ${values.code}`,
    };
    await sendgrid.send(msg);
  }
}
