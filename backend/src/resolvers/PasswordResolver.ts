import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/User";
import * as argon from "argon2";
import crypto from "crypto";
import { createTransport } from "nodemailer";
import { GraphQLError } from "graphql";


@Resolver()
export class PasswordResolver {
  @Mutation(() => String)
  async forgotPassword(@Arg("email") email: string): Promise<string> {

    const { GMAIL_USERNAME, GMAIL_PASSWORD } = process.env;
  
    if (!GMAIL_USERNAME || !GMAIL_PASSWORD) {
      throw new Error("GMAIL_USERNAME and GMAIL_PASSWORD must be set in .env file");
    };

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new GraphQLError("Si un compte est associé à cet e-mail, un lien de réinitialisation a été envoyé.", {
        extensions: { code: "USER_NOT_FOUND" },
      });
    };

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour from now

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    const resetUrl = `http://localhost:7000/resetPassword?token=${resetToken}`;

    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USERNAME,
        pass: GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: GMAIL_USERNAME,
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #0056b3;">Réinitialisation de votre mot de passe</h2>
          <p>Bonjour,</p>
          <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour procéder :</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #0056b3; color: #fff; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
              Réinitialiser mon mot de passe
            </a>
          </p>
          <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.</p>
          <p>Merci,</p>
          <p>L'équipe City Guide</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail:", error);
      } else {
        console.log("E-mail envoyé:", info.response);
      }
    });

    return "Un e-mail de réinitialisation a été envoyé à votre adresse e-mail.";
  }


  @Mutation(() => String)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
  ): Promise<string> {
    const user = await User.findOne({ where: { resetToken: token } });
    if (!user || !user.resetTokenExpiration || user.resetTokenExpiration < new Date()) {
      throw new GraphQLError("Invalid or expired token", {
        extensions: { code: "TOKEN_NOT_FOUND" },
      });
    };

    const hashedPassword = await argon.hash(newPassword);
    user.hashedPassword = hashedPassword;
    user.resetToken = null; // Clear the reset token
    user.resetTokenExpiration = null; // Clear the expiration date
    await user.save();

    return "Mot de passe réinitialisé avec succès";
  }
}