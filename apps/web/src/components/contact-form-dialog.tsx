import { useShared } from '@ez/shared/hooks/use-shared'
import { DialogContent, DialogHeader, DialogTitle } from '@ez/shared/ui/dialog'
import { useTranslations } from 'next-intl';
import { ContactForm } from './contact-form'

export function ContactFormDialog() {
  const { setIsContactDialogOpen, contactSubject } = useShared()

  const t = useTranslations('DialogContact');

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
        <DialogTitle>{t('title')}</DialogTitle>
      </DialogHeader>

      <ContactForm isDialog onCloseAction={closeDialog} subject={contactSubject} />
    </DialogContent>
  )
}
