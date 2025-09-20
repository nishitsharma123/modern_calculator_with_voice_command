import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCalculationSchema, insertMemoryValueSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Calculation history routes
  app.get("/api/calculations", async (req, res) => {
    try {
      const calculations = await storage.getCalculations();
      res.json(calculations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch calculations" });
    }
  });

  app.post("/api/calculations", async (req, res) => {
    try {
      const validatedData = insertCalculationSchema.parse(req.body);
      const calculation = await storage.addCalculation(validatedData);
      res.json(calculation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid calculation data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save calculation" });
      }
    }
  });

  app.delete("/api/calculations", async (req, res) => {
    try {
      await storage.clearCalculations();
      res.json({ message: "Calculations cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear calculations" });
    }
  });

  // Memory values routes
  app.get("/api/memory", async (req, res) => {
    try {
      const memoryValues = await storage.getMemoryValues();
      res.json(memoryValues);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch memory values" });
    }
  });

  app.post("/api/memory", async (req, res) => {
    try {
      const validatedData = insertMemoryValueSchema.parse(req.body);
      const memoryValue = await storage.addMemoryValue(validatedData);
      res.json(memoryValue);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid memory value data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save memory value" });
      }
    }
  });

  app.delete("/api/memory/:id", async (req, res) => {
    try {
      await storage.deleteMemoryValue(req.params.id);
      res.json({ message: "Memory value deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete memory value" });
    }
  });

  app.delete("/api/memory", async (req, res) => {
    try {
      await storage.clearMemoryValues();
      res.json({ message: "Memory values cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear memory values" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
