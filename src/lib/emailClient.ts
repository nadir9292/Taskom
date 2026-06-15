const RESEND_API_KEY = process.env.RESEND_API_KEY!
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
const FROM_EMAIL = 'Flowboro <noreply@flowboro.app>'

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(`Failed to send email: ${JSON.stringify(error)}`)
  }
}

export async function sendInviteEmail(to: string, teamName: string, token: string) {
  const inviteUrl = `${APP_URL}/invite/${token}`
  await sendEmail(
    to,
    `Invitation à rejoindre ${teamName} sur Flowboro`,
    `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2>Tu as été invité à rejoindre <strong>${teamName}</strong></h2>
        <p>Clique sur le lien ci-dessous pour accepter l'invitation :</p>
        <a href="${inviteUrl}" style="display:inline-block;padding:12px 24px;background:#7c3aed;color:#fff;border-radius:8px;text-decoration:none;">
          Accepter l'invitation
        </a>
        <p style="color:#888;font-size:12px;margin-top:24px;">Ce lien expire dans 7 jours.</p>
      </div>
    `
  )
}

export async function sendRegisterAndInviteEmail(to: string, teamName: string, token: string) {
  const inviteUrl = `${APP_URL}/invite/${token}`
  await sendEmail(
    to,
    `Rejoins ${teamName} sur Flowboro`,
    `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2>Tu as été invité à rejoindre <strong>${teamName}</strong> sur Flowboro</h2>
        <p>Pour accepter l'invitation, crée d'abord un compte, puis clique sur ce lien :</p>
        <a href="${inviteUrl}" style="display:inline-block;padding:12px 24px;background:#7c3aed;color:#fff;border-radius:8px;text-decoration:none;">
          Créer un compte et rejoindre l'équipe
        </a>
        <p style="color:#888;font-size:12px;margin-top:24px;">Ce lien expire dans 7 jours.</p>
      </div>
    `
  )
}
