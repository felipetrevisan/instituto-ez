import type { SanityAsset } from '@ez/shared/types'
import { urlForImage } from '@ez/web/config/image'
import type { ContactFormSchema } from '@ez/web/types/contact'
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'

const base = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif",
  color: '#333333',
}

export function EmailTemplate({
  name,
  email,
  phone,
  subject,
  message,
  logo
}: ContactFormSchema & { logo?: SanityAsset }) {
  return (
    <Html>
      <Head />
      <Preview>Novo contato pelo formulário</Preview>
      <Body style={{ backgroundColor: '#f5f7fb', margin: 0, padding: 0 }}>
        <Container style={{ margin: '0 auto', padding: '24px 16px', maxWidth: 680 }}>
          {/* <Section style={{ textAlign: 'center', padding: '16px 0' }}>
            <Img
              alt="Logo"
              height={40}
              src={logo && urlForImage(logo?.asset).format('webp').quality(80).url()}
              style={{ display: 'block', margin: '0 auto' }}
              width={160}
            />
          </Section> */}
          <Section style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 24 }}>
            <Text style={{ ...base, fontSize: 20, fontWeight: 600 }}>Novo contato recebido</Text>
            <Text style={{ ...base, fontSize: 18, fontWeight: 600 }}>Assunto: {subject}</Text>
            <Text style={{ ...base, fontSize: 15, marginTop: 12 }}>
              <strong>Nome:</strong> {name}
              <br />
              <strong>Email:</strong> {email}
              <br />
              <strong>Telefone:</strong> {phone}
            </Text>
            <Hr style={{ border: 0, borderTop: '1px solid #eef1f7', margin: '20px 0' }} />
            <Text style={{ ...base, fontSize: 15, whiteSpace: 'pre-line' }}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
