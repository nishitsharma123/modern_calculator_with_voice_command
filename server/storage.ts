import { type Calculation, type InsertCalculation, type MemoryValue, type InsertMemoryValue } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Calculation history
  getCalculations(): Promise<Calculation[]>;
  addCalculation(calculation: InsertCalculation): Promise<Calculation>;
  clearCalculations(): Promise<void>;
  
  // Memory values
  getMemoryValues(): Promise<MemoryValue[]>;
  addMemoryValue(memoryValue: InsertMemoryValue): Promise<MemoryValue>;
  deleteMemoryValue(id: string): Promise<void>;
  clearMemoryValues(): Promise<void>;
}

export class MemStorage implements IStorage {
  private calculations: Map<string, Calculation>;
  private memoryValues: Map<string, MemoryValue>;

  constructor() {
    this.calculations = new Map();
    this.memoryValues = new Map();
  }

  async getCalculations(): Promise<Calculation[]> {
    return Array.from(this.calculations.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async addCalculation(insertCalculation: InsertCalculation): Promise<Calculation> {
    const id = randomUUID();
    const calculation: Calculation = {
      ...insertCalculation,
      id,
      timestamp: new Date(),
    };
    this.calculations.set(id, calculation);
    return calculation;
  }

  async clearCalculations(): Promise<void> {
    this.calculations.clear();
  }

  async getMemoryValues(): Promise<MemoryValue[]> {
    return Array.from(this.memoryValues.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async addMemoryValue(insertMemoryValue: InsertMemoryValue): Promise<MemoryValue> {
    const id = randomUUID();
    const memoryValue: MemoryValue = {
      ...insertMemoryValue,
      id,
      timestamp: new Date(),
    };
    this.memoryValues.set(id, memoryValue);
    return memoryValue;
  }

  async deleteMemoryValue(id: string): Promise<void> {
    this.memoryValues.delete(id);
  }

  async clearMemoryValues(): Promise<void> {
    this.memoryValues.clear();
  }
}

export const storage = new MemStorage();
