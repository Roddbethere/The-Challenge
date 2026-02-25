# FILE: shape_system/loggers.py
# LAYER: Infrastructure — knows WHERE to write, nothing about area math

from abc import ABC, abstractmethod
from typing import List


class ShapeLogger(ABC):
    """
    Abstract base for all loggers.
    ShapeService depends on THIS type — not on ConsoleShapeLogger directly.
    This means you can swap loggers without touching ShapeService.
    """

    @abstractmethod
    def log(self, message: str) -> None:
        """Write one log entry somewhere."""
        ...

    @abstractmethod
    def get_history(self) -> List[str]:
        """Return all messages logged so far."""
        ...


class ConsoleShapeLogger(ShapeLogger):
    """Prints to the terminal and stores history in a list."""

    def __init__(self):
        self._history: List[str] = []

    def log(self, message: str) -> None:
        print(message)               # The ONLY place print() is allowed
        self._history.append(message)

    def get_history(self) -> List[str]:
        return list(self._history)   # Return a copy so callers can't mutate it


class FileShapeLogger(ShapeLogger):
    """Appends each entry to a file. Path is set once at construction."""

    def __init__(self, file_path: str):
        if not file_path or not file_path.strip():
            raise ValueError("file_path cannot be blank.")
        self._file_path = file_path
        self._history: List[str] = []

    def log(self, message: str) -> None:
        with open(self._file_path, "a", encoding="utf-8") as f:
            f.write(message + "\n")  # The ONLY place open() is allowed
        self._history.append(message)

    def get_history(self) -> List[str]:
        return list(self._history)


class InMemoryShapeLogger(ShapeLogger):
    """Stores messages in a list only — no real I/O. Great for unit tests."""

    def __init__(self):
        self._history: List[str] = []

    def log(self, message: str) -> None:
        self._history.append(message)   # No print, no file — memory only

    def get_history(self) -> List[str]:
        return list(self._history)