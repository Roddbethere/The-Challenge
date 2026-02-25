# FILE: shape_system/shapes.py
# LAYER: Domain — pure math, no print(), no open(), no imports of loggers

import math
from abc import ABC, abstractmethod


class Shape(ABC):
    """
    Abstract base class. You cannot do Shape() directly.
    Every subclass MUST implement shape_type and calculate_area().
    """

    @property
    @abstractmethod
    def shape_type(self) -> str:
        """Returns a string name like 'Circle' or 'Rectangle'."""
        ...

    @abstractmethod
    def calculate_area(self) -> float:
        """Returns the calculated area as a float."""
        ...

    def __repr__(self) -> str:
        return f"{self.shape_type}(area={self.calculate_area():.4f})"


class Circle(Shape):
    def __init__(self, radius: float):
        # Guard: protect the invariant at creation time
        if radius <= 0:
            raise ValueError(f"Radius must be > 0. You passed: {radius}")
        self._radius = radius        # _radius is "private" by convention (underscore)

    @property
    def shape_type(self) -> str:
        return "Circle"

    @property
    def radius(self) -> float:
        return self._radius          # Read-only access

    def calculate_area(self) -> float:
        return math.pi * self._radius ** 2


class Square(Shape):
    def __init__(self, side: float):
        if side <= 0:
            raise ValueError(f"Side must be > 0. You passed: {side}")
        self._side = side

    @property
    def shape_type(self) -> str:
        return "Square"

    def calculate_area(self) -> float:
        return self._side ** 2


class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        if width  <= 0: raise ValueError(f"Width must be > 0.  Got: {width}")
        if height <= 0: raise ValueError(f"Height must be > 0. Got: {height}")
        self._width  = width
        self._height = height

    @property
    def shape_type(self) -> str:
        return "Rectangle"

    def calculate_area(self) -> float:
        return self._width * self._height


# ADDING A NEW SHAPE = add a class here. Nothing else in the project changes.
class Hexagon(Shape):
    def __init__(self, side_length: float):
        if side_length <= 0:
            raise ValueError(f"Side length must be > 0. Got: {side_length}")
        self._side_length = side_length

    @property
    def shape_type(self) -> str:
        return "Hexagon"

    def calculate_area(self) -> float:
        return (3 * math.sqrt(3) / 2) * self._side_length ** 2