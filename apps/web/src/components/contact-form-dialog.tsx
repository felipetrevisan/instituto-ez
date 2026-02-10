import { useShared } from '@ez/shared/hooks/use-shared'
import { DialogContent, DialogHeader, DialogTitle } from '@ez/shared/ui/dialog'
import { FadeIn } from '@ez/web/components/ui/fade-in'
import { ContactForm } from './contact-form'

export function ContactFormDialog({
  title,
  sendButtonLabel,
}: {
  title?: string
  sendButtonLabel: string
}) {
  const { setIsContactDialogOpen, contactSubject } = useShared()

  const closeDialog = () => {
    setIsContactDialogOpen(false)
  }

  return (
    <DialogContent className="container max-w-3xl" from="left" onClose={closeDialog}>
      <FadeIn>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        <ContactForm
          isDialog
          onCloseAction={closeDialog}
          sendButtonLabel={sendButtonLabel}
          subject={contactSubject}
        />
      </FadeIn>
    </DialogContent>
  )
}
