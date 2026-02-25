// FILE: ShapeSystem.Infrastructure/ShapeLoggers.cs
// LAYER: Infrastructure — knows WHERE to write, nothing about math

using System;
using System.Collections.Generic;
using System.IO;

namespace ShapeSystem.Infrastructure
{
    // The interface — ShapeService will depend on THIS, not on any concrete logger.
    // This is the key to swappability.
    public interface IShapeLogger
    {
        void Log(string message);
        IReadOnlyList<string> GetHistory();
    }

    // Writes to the console window and keeps a private history list.
    public class ConsoleShapeLogger : IShapeLogger
    {
        private readonly List<string> _history = new();

        public void Log(string message)
        {
            Console.WriteLine(message);
            _history.Add(message);
        }

        public IReadOnlyList<string> GetHistory() => _history.AsReadOnly();
    }

    // Appends to a text file. The file path is set once in the constructor.
    public class FileShapeLogger : IShapeLogger
    {
        private readonly string _filePath;
        private readonly List<string> _history = new();

        public FileShapeLogger(string filePath)
        {
            if (string.IsNullOrWhiteSpace(filePath))
                throw new ArgumentException("File path cannot be blank.", nameof(filePath));
            _filePath = filePath;
        }

        public void Log(string message)
        {
            File.AppendAllText(_filePath, message + Environment.NewLine);
            _history.Add(message);
        }

        public IReadOnlyList<string> GetHistory() => _history.AsReadOnly();
    }

    // Stores messages in memory only. Perfect for unit tests — no real I/O.
    public class InMemoryShapeLogger : IShapeLogger
    {
        private readonly List<string> _history = new();

        public void Log(string message) => _history.Add(message);
        public IReadOnlyList<string> GetHistory() => _history.AsReadOnly();
    }
}