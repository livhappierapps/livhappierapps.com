import { Router, type IRouter } from "express";
import { db, messagesTable, insertMessageSchema } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/messages", async (req, res) => {
  try {
    const messages = await db
      .select()
      .from(messagesTable)
      .orderBy(desc(messagesTable.createdAt))
      .limit(50);
    res.json(messages.reverse());
  } catch (err) {
    req.log.error({ err }, "Failed to fetch messages");
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.post("/messages", async (req, res) => {
  const parsed = insertMessageSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }
  try {
    const [message] = await db
      .insert(messagesTable)
      .values(parsed.data)
      .returning();
    res.status(201).json(message);
  } catch (err) {
    req.log.error({ err }, "Failed to create message");
    res.status(500).json({ error: "Failed to create message" });
  }
});

export default router;
