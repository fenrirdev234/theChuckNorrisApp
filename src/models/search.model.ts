import { z } from 'zod'

export const searchSchema = z.object({
	search: z.string().min(3, 'The search must be at least 3 characters long'),
})

export type ISearchValue = z.infer<typeof searchSchema>
