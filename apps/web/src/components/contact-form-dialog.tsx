import { useShared } from '@ez/shared/hooks/use-shared'
import { DialogContent, DialogHeader, DialogTitle } from '@ez/shared/ui/dialog'
import { ContactForm } from './contact-form'

export function ContactFormDialog() {
  const { setIsContactDialogOpen, contactSubject } = useShared()

  const closeDialog = () => {
    setIsContactDialogOpen(false)
  }

  return (
    <DialogContent
      className="container max-w-3xl"
      onEscapeKeyDown={closeDialog}
      from="left"
      onClose={closeDialog}
    >
      <DialogHeader>
        <DialogTitle>Como podemos te ajudar?</DialogTitle>
      </DialogHeader>

      <ContactForm isDialog onCloseAction={closeDialog} subject={contactSubject} />
    </DialogContent>
  )
}
