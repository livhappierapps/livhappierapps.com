import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

// Define the schemas based on standard API practices for this app
export const messageSchema = z.object({
  id: z.number(),
  username: z.string(),
  content: z.string(),
  createdAt: z.coerce.date(),
});

export const messageArraySchema = z.array(messageSchema);

export type Message = z.infer<typeof messageSchema>;

export interface CreateMessageInput {
  username: string;
  content: string;
}

export function useMessages() {
  return useQuery({
    queryKey: ["/api/messages"],
    queryFn: async () => {
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      
      // Parse with logging to catch serialization issues silently
      const result = messageArraySchema.safeParse(data);
      if (!result.success) {
        console.error("[Zod] /api/messages validation failed:", result.error.format());
        return []; // Fallback to empty array on schema mismatch
      }
      return result.data;
    },
    refetchInterval: 3000, // Poll every 3 seconds as requested
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateMessageInput) => {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error("Failed to post message");
      
      const json = await res.json();
      return messageSchema.parse(json);
    },
    onSuccess: () => {
      // Invalidate and refetch immediately after posting
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
    },
  });
}
