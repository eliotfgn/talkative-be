import { z } from "zod";

const CategoryDto = z.object({
    name: z.string(),
    banner: z.optional(z.string()),
});

type CategoryDtoType = z.infer<typeof CategoryDto>;

export { CategoryDtoType, CategoryDto };