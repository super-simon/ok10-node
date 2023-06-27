import nodemailer from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";

import { configs } from "../configs/config";
import { allTemplates } from "../constants/email.constants";
import { EEmailActions } from "../eums/email.enum";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No reply",
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASS,
      },
    });

    const hbsOptions: NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "layouts"
        ),
        partialsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "partials"
        ),
      },
      viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
      extName: ".hbs",
    };
    this.transporter.use("compile", hbs(hbsOptions));
  }

  public async sendMail(
    email: string,
    emailAction: EEmailActions,
    context: Record<string, string | number> = {}
  ) {
    const { templateName, subject } = allTemplates[emailAction];
    const mailOptions = {
      to: email,
      subject,
      template: templateName,
      context,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
