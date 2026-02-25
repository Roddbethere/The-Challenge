# FILE: shape_system/shape_service.py
# LAYER: Service — the thin coordinator. No math. No I/O.

from datetime import datetime
from shapes import Shape          # From our Domain layer
from loggers import ShapeLogger   # From our Infrastructure layer


class ShapeService:
    """
    Receives a Shape, asks it to calculate its area,
    then hands the formatted result to the logger.
    That's it. Nothing else lives here.
    """

    def __init__(self, logger: ShapeLogger):
        if logger is None:
            raise ValueError("logger cannot be None.")
        self._logger = logger

    def process(self, shape: Shape) -> float:
        """Process one shape: calculate area, log it, return the area."""
        if shape is None:
            raise ValueError("shape cannot be None.")

        area      = shape.calculate_area()    # Domain does the math
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        entry     = f"[{timestamp}] {shape.shape_type}: area = {area:.4f}"
        self._logger.log(entry)               # Infrastructure does the output

        return area