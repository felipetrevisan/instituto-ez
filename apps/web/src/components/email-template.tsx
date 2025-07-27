import type { ContactFormSchema } from '@ez/web/types/contact'
import { Body, Container, Head, Heading, Html, Img, Tailwind, Text } from '@react-email/components'

export function EmailTemplate({ name, subject, message }: ContactFormSchema) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white">
          <Container className="bg-white border border-gray-400 shadow">
            <Img src="/assets/logo.png" width="212" height="88" alt="" />
            <Heading className="text-black text-md">Olá, {name} enviou uma mensagem</Heading>
            <Text className="text-black text-md">
              {subject}

              {message}
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}
