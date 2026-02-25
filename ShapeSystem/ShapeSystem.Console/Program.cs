// FILE: ShapeSystem.Console/Program.cs
// This is the Composition Root — the ONE place where we decide which
// concrete logger to use and wire everything together.

using ShapeSystem.Application;
using ShapeSystem.Domain;
using ShapeSystem.Infrastructure;

Console.WriteLine("=== Shape System (Refactored) ===\n");

// To switch loggers, change ONLY this one line:
IShapeLogger logger = new ConsoleShapeLogger();
// IShapeLogger logger = new FileShapeLogger(@"C:\Temp\shapes.txt");
// IShapeLogger logger = new InMemoryShapeLogger();

var service = new ShapeService(logger);

// No if/else chains. Each shape knows its own formula.
service.Process(new Circle(5));
service.Process(new Rectangle(4, 6));
service.Process(new Triangle(3, 8));
service.Process(new Hexagon(7));   // Adding this required ZERO changes to ShapeService

Console.WriteLine($"\n--- History ({logger.GetHistory().Count} entries) ---");
foreach (string entry in logger.GetHistory())
    Console.WriteLine("  " + entry);