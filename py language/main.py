# FILE: shape_system/main.py
# This is the Composition Root — the ONE place where we choose a logger
# and wire all layers together.

from shapes import Circle, Square, Rectangle, Hexagon
from loggers import ConsoleShapeLogger
from shape_service import ShapeService

print("=== Shape System (Refactored) ===\n")

# To switch loggers, change ONLY these two lines:
logger  = ConsoleShapeLogger()
# logger = FileShapeLogger("shape_log.txt")
# logger = InMemoryShapeLogger()

service = ShapeService(logger)

# No if/elif chains. Each shape owns its formula.
service.process(Circle(5))
service.process(Square(4))
service.process(Rectangle(3, 7))
service.process(Hexagon(6))     # New shape — zero changes to ShapeService!

history = logger.get_history()
print(f"\n--- History ({len(history)} entries) ---")
for entry in history:
    print("  " + entry)