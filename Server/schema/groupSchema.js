import { z } from "zod";

const groupSchema = z.object({
  name: z.string().trim().min(2, "Name should contain at least 2 characters"),

  lead: z
    .array(z.string().trim().min(1, "Lead name can't be empty"))
    .min(1, "There should be at least 1 Lead"),

  assistant: z
    .array(z.string().trim().min(1, "Assistant name can't be empty"))
    .default([]),

  members: z
    .array(z.string().trim().min(1, "Member name can't be empty"))
    .min(1, "There should be at least 1 member"),

  bio: z
    .string()
    .trim()
    .min(2, "Bio should contain at least 2 characters")
    .max(250, "Bio should contain at most 250 characters")
    .optional(),
});

export default groupSchema;
