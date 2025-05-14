import { z } from "zod";

export const subscriptionSchema = z.object({
    plan: z.enum(["Basic", "Premium"]),
});