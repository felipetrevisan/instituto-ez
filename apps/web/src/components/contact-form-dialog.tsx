import { useShared } from '@ez/shared/hooks/use-shared'
import { DialogContent, DialogHeader, DialogTitle } from '@ez/shared/ui/dialog'
import { ContactForm } from './contact-form'

export function ContactFormDialog({
  title,
  sendButtonLabel,
  formRef,
}: {
  title?: string
  sendButtonLabel: string
  formRef: string
}) {
  const { setIsContactDialogOpen, contactSubject } = useShared()

  const closeDialog = () => {
    setIsContactDialogOpen(false)
  }

  return (
    <DialogContent className="container max-w-3xl" from="left" onClose={closeDialog}>
      {title && (
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
      )}

      <ContactForm
        formRef={formRef}
        isDialog
        onCloseAction={closeDialog}
        sendButtonLabel={sendButtonLabel}
        subject={contactSubject}
      />
    </DialogContent>
  )
}
