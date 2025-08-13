import { getFormById } from '@ez/web/server/get-form'
import type { Form } from '@ez/web/types/form'
import { useQuery } from '@tanstack/react-query'

export function useForm(formId: string) {
  const { data, isLoading, isPending } = useQuery<Form>({
    queryKey: ['form', formId],
    queryFn: () => getFormById(formId),
  })

  return { data, isLoading, isPending }
}
